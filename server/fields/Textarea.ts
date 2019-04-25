import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Textarea extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Textarea'

    /**
     * Initialize the Textarea field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Textarea'
        this.attribute = attribute || ChangeCase.camelCase(this.name)

        this.hideOnIndex()
    }

    /**
     *
     * Make a new Textarea
     *
     * @return {Textarea}
     *
     */
    static make(name: string, attribute?: string) {
        return new Textarea(name, attribute)
    }
}
