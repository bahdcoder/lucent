import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Num extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Num'

    /**
     * Initialize the Num field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Num'
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a new Num
     *
     * @return {Num}
     *
     */
    static make(name: string, attribute?: string) {
        return new Num(name, attribute)
    }
}
