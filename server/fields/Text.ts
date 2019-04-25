import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Text extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Text'

    /**
     * Initialize the Text field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Text'
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a new Text
     *
     * @return {Text}
     *
     */
    static make(name: string, attribute?: string) {
        return new Text(name, attribute)
    }
}
