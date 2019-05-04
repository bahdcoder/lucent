import * as Express from 'express'
import { IResource } from '../index.d'
import * as ChangeCase from 'change-case'

export class Action {
    /**
     *
     * Determines if this action is destructive
     *
     * @type {Boolean}
     *
     */
    public isDestructive: Boolean = false

    /**
     * The Identifier of the action
     *
     * @type {string}
     *
     */
    private id: string = ChangeCase.camelCase(this.constructor.name)

    /**
     *
     * Define the name of this action. Will be displayed
     * on the resource index page.
     *
     * @type {String}
     *
     */
    public name: string = ChangeCase.sentenceCase(this.constructor.name)

    /**
     * Define the method to handle this action
     *
     * @param {object} databaseConnection the connection to the specific
     * resource this action will be performed on
     *
     * @param {Express.Request} currentRequest the current express request object
     * which contains the authenticated user, body, etc
     *
     * @param {array[IResource]} resources an array of all selected resources from the
     * frontend selected by user
     *
     * @return {Promise}
     *
     */
    public async handle(
        databaseConnection: any,
        request: Express.Request,
        resources: [IResource]
    ): Promise<any> {
        return Promise.resolve({ databaseConnection, request, resources })
    }

    /**
     *
     * Determine if this action is destructive
     *
     * @return {Action}
     *
     */
    public destructive(destructive: boolean = true) {
        this.isDestructive = destructive

        return this
    }

    /**
     *
     * Define an alternate name for this action
     *
     * @return {Action}
     *
     */
    public as(name: string) {
        this.name = name

        return this
    }

    /**
     *
     * Fields used to collect data from user on frontend
     *
     * @return {Array}
     *
     */
    public fields() {
        return []
    }

    /**
     *
     * Serialize this action
     *
     * @return {Action}
     *
     */
    public serialize() {
        return {
            id: this.id,
            name: this.name,
            fields: this.fields(),
            isDestructive: this.isDestructive
        }
    }
}
