import { Field } from './Field'
import { IField } from '../index.d'
import * as ChangeCase from 'change-case'

export class HasMany extends Field implements IField {
    /**
     * Define a type for this field
     *
     * @var {String}
     *
     */
    public type: string = 'HasMany'

    /**
     *
     * Declare the resource this field relates to
     *
     * @type {String}
     *
     */
    public resource: string | undefined = undefined

    /**
     *
     * Initialize a HasMany instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    constructor(name: string, attribute?: string, resource?: string) {
        super()

        this.name = name
        this.resource = resource || name
        this.attribute = attribute || ChangeCase.camelCase(this.name)

        this.hideOnIndex()
        this.hideOnDetail()
    }

    /**
     * Make a HasMany Instance
     *
     * @param {string} name the name of the relationship
     *
     * @param {string} attribute the name of the attribute on this resource
     *
     * @param {string} resource the name of the matching related resource
     *
     * @param  {...any} args
     *
     * @return {HasMany}
     *
     */
    static make(name: string, attribute?: string, resource?: string) {
        return new HasMany(name, attribute, resource)
    }
}
