import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class BelongsTo extends Field {
    /**
     * Define a type for this field
     *
     * @var {String}
     *
     */
    public type: string = 'BelongsTo'

    /**
     *
     * Declare the resource this field relates to
     *
     * @type {String}
     *
     */
    public resource: string | null = null

    /**
     *
     * Initialize a BelongsTo instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    constructor(name: string, resource: string, attribute?: string) {
        super()

        this.name = name
        this.resource = resource
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     * Make a BelongsTo Instance
     *
     * @param  {...any} args
     *
     * @return {BelongsTo}
     *
     */
    static make(name: string, resource: string, attribute?: string) {
        return new BelongsTo(name, resource, attribute)
    }
}
