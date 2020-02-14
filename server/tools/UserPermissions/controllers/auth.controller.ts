import * as Bcrypt from 'bcryptjs'
import * as Express from 'express'
import * as Indicative from 'indicative'
import { IResource } from '../../../index.d'

class AuthController {
    public async register(request: Express.Request, response: Express.Response) {
        try {
            await Indicative.validateAll(request.body, {
                email: 'required|email',
                name: 'required',
                password: 'required|min:8'
            })
        } catch (errors) {
            const formattedErrors: any = {}

            errors.forEach((error: any) => {
                formattedErrors[error.field] = error.message
            })  
            return response.status(400).json(formattedErrors)
        }

        // @ts-ignore
        const userResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'User'
        )

        // @ts-ignore
        const roleResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'Role'
        )

        // @ts-ignore
        const permissionResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'Permission'
        )

        //
        const adminRole = await request.lucent.database.findOneWhere(
            roleResource.collection(),
            {
                name: 'admin'
            }
        )

        console.log('=========>', adminRole)

        const existingAdmin = await request.lucent.database.findOneWhere(
            userResource.collection(),
            {
                role: adminRole._id.toString()
            }
        )

        if (existingAdmin) return response.status(400).json({
            email: ['An administrator user already exists.']
        })

        await request.lucent.database.insert(userResource.collection(), {
            ...request.body,
            role: adminRole._id.toString(),
            password: Bcrypt.hashSync(request.body.password)
        })

        const permissions = {}

        const permissionsForRole = await request.lucent.database.findAll(
            permissionResource.collection(),
            adminRole.permissions
        )

        permissionsForRole.forEach((permission: any) => {
            // @ts-ignore
            permissions[permission.slug] = true
        })

        const user = await request.lucent.database.findOneWhere(
            userResource.collection(),
            {
                email: request.body.email
            }
        )

        // @ts-ignore
        request.session.user = {
            ...user,
            permissions
        }

        return response.status(201).json(user)
    }

    public async login(request: Express.Request, response: Express.Response) {
        // @ts-ignore
        const userResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'User'
        )

        // @ts-ignore
        const roleResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'Role'
        )

        // @ts-ignore
        const permissionResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'Permission'
        )

        const user = await request.lucent.database.findOneWhere(
            userResource.collection(),
            {
                email: request.body.email
            }
        )

        if (!user)
            return response.status(400).json({
                email: ['These credentials do not match our records.']
            })

        if (!Bcrypt.compareSync(request.body.password, user.password))
            return response.status(400).json({
                email: ['These credentials do not match our records.']
            })

        const role = await request.lucent.database.find(
            roleResource.collection(),
            user.role
        )
        let permissions = {}

        console.log('xxxxxxxx', role)

        if (role) {
            const permissionsForRole = await request.lucent.database.findAll(
                permissionResource.collection(),
                role.permissions || []
            )

            permissionsForRole.forEach((permission: any) => {
                // @ts-ignore
                permissions[permission.slug] = true
            })
        }

        // @ts-ignore
        request.session.user = {
            ...user,
            permissions
        }

        return response.json([])
    }

    public async init(request: Express.Request, response: Express.Response) {
        // @ts-ignore
        const userResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'User'
        )

        // @ts-ignore
        const roleResource: IResource = request.lucent.resources.find(
            (resource: IResource) => resource.name() === 'Role'
        )

        //
        const adminRole = await request.lucent.database.findOneWhere(
            roleResource.collection(),
            {
                name: 'admin'
            }
        )

        const user = await request.lucent.database.findOneWhere(
            userResource.collection(),
            {
                role: adminRole._id.toString()
            }
        )

        return response.json({
            hasAdmin: !!user
        })
    }

    /**
     * Fetch the authenticated user
     */
    public async me(request: Express.Request, response: Express.Response) {
        return response.json(request.lucent.user)
    }

    /**
     * Delete the current user's session
     */
    public async logout(request: Express.Request, response: Express.Response) {
        // @ts-ignore
        request.session.user = null

        return response.json([])
    }
}

export const Auth = new AuthController()
