import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Password extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Password'

    /**
     * Initialize the Password field
     *
     * @param {string} name
     *
     * @return {voPassword}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Password'
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a new Password
     *
     * @return {Password}
     *
     */
    static make(name: string, attribute?: string) {
        return new Password(name, attribute)
    }
}
