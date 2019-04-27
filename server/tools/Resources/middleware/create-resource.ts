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

        let errors: any = {}
        let topLevelRules: any = {}

        for (const attribute in rules) {
            if (rules.hasOwnProperty(attribute)) {
                const rule = rules[attribute]

                if (typeof rule === 'string') {
                    topLevelRules[attribute] = rule
                } else {
                    try {
                        await Indicative.validateAll(
                            data[attribute],
                            rule,
                            messages
                        )
                    } catch (nestedErrors) {
                        errors[attribute] = nestedErrors
                    }
                }
            }
        }

        try {
            await Indicative.validateAll(data, topLevelRules, messages)
        } catch (topLevelErrors) {
            errors.topLevelErrors = topLevelErrors
        }

        if (Object.keys(errors).length === 0) {
            return next()
        }

        return res.status(422).json({
            resourceErrors: errors
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
                if (field.type === 'HasOneEmbedded') {
                    rules[field.attribute] = {}
                    field.fields &&
                        field.fields.forEach((embeddedField: IField) => {
                            if (embeddedField.creationRules) {
                                rules[field.attribute][
                                    embeddedField.attribute
                                ] = embeddedField.creationRules
                            }
                        })
                }

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
