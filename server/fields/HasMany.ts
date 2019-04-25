import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class HasMany extends Field {
    /**
     * Define the type of thie field
     *
     * @var {String}
     *
     */
    public type: string = 'HasMany'

    /**
     * Create a new instance of this field
     *
     * @param {string }name
     * @param {string} resource
     * @param {string} attribute
     *
     * @return {void}
     *
     */
    constructor(
        public name: string,
        public resource: string,
        public attribute: string = ''
    ) {
        super()

        this.name = name
        this.resource = resource
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Create a new HasMany relationship instance
     *
     * @return {HasMany}
     *
     */
    static make(name: string, resource: string, attribute?: string) {
        return new HasMany(name, resource, attribute)
    }
}
