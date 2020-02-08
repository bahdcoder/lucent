import * as Express from 'express'
import { IResource } from '../../../index.d'

class SetResource {
    /**
     *
     * Handle create resource validation
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    public static async handle(
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ) {
        if (!req.params.slug) {
            return next()
        }

        const resource = req.lucent.resources.find(
            (r: IResource) => r.slug() === req.params.slug
        )

        req.lucent.resource = resource

        return next()
    }
}

export const SetResourceMiddleware = SetResource.handle
