import * as Express from 'express'
import * as Jwt from 'jsonwebtoken'
import { IResource } from '../../../index.d'

export default async (request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
    const token = request.get('token')

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

    if (! token) return response.status(400).json({
        message: 'Unauthorized.'
    })

    try {
        const { data } = Jwt.verify(token, request.lucent.jwtSecret) as { data: { _id: string } }

        if (! data._id) return response.status(400).json({
            message: 'Unauthorized.'
        })

        const user = await request.lucent.database.find(userResource.collection(), data._id)

        if (! user) return response.status(400).json({
            message: 'Unauthorized.'
        })

        const role = await request.lucent.database.find(roleResource.collection(), user.role)
        let permissions = {}

        if (role) {
            const permissionsForRole = await request.lucent.database.findAll(permissionResource.collection(), role.permissions)

            permissionsForRole.forEach((permission: any) => {
                // @ts-ignore
                permissions[permission.slug] = true
            })
        }

        user.permissions = permissions

        request.lucent.user = user

        return next()
    } catch (e) {
        return response.status(400).json({
            message: 'Unauthorized.'
        })
    }
}