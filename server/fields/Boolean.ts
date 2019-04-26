import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Boolean extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Boolean'

    /**
     * Initialize the Boolean field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Boolean'
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a Boolean
     *
     * @return {Boolean}
     *
     */
    static make(name: string, attribute?: string) {
        return new Boolean(name, attribute)
    }
}
