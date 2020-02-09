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

        const token = Jwt.sign(
            {
                exp:
                    Math.floor(Date.now() / 1000) +
                    (request.body.rememberMe ? 168 : 60) * 60,
                data: {
                    _id: user._id
                }
            },
            request.lucent.jwtSecret
        )

        return response.json({
            user,
            token,
        })
    }

    /**
     * Fetch the authenticated user
     */
    public async me(request: Express.Request, response: Express.Response) {
        return response.json(request.lucent.user)
    }
}

export const Auth = new AuthController()
