import * as Express from 'express'
import * as Indicative from 'indicative'
import { IResource, IField } from '../../../index.d'

class CreateResource {
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
        const { resource } = req.pangaso

        const data = req.body

        const messages = CreateResource.customMessages()
        const rules = CreateResource.buildValidationRules(resource)

        return Indicative.validateAll(data, rules, messages)
            .then(() => {
                return next()
            })
            .catch((errors: any) => {
                return res.status(422).json(errors)
            })
    }

    /**
     *
     * Loop through all fields for a resource and build validation rules
     *
     * @param {IResource}
     *
     * @return {object}
     *
     */
    public static buildValidationRules(resource: IResource) {
        const rules: any = {}

        resource
            .fields()
            .filter((field: IField) => field.type !== 'ID')
            .forEach((field: IField) => {
                if (field.creationRules) {
                    rules[field.attribute] = field.creationRules
                }
            })

        return rules
    }

    /**
     *
     * Define custom validation messages
     *
     * @return {Object}
     *
     */
    public static customMessages(): object {
        return {
            required: 'The {{ field }} is required.'
        }
    }
}

export const CreateResourceValidator = CreateResource.handle
