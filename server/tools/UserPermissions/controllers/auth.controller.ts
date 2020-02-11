import * as Bcrypt from 'bcryptjs'
import * as Express from 'express'
import * as Jwt from 'jsonwebtoken'
import { IResource } from '../../../index.d'

class AuthController {
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

        if (role) {
            const permissionsForRole = await request.lucent.database.findAll(
                permissionResource.collection(),
                role.permissions
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
