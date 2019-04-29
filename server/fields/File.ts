import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class File extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'File'

    /**
     * Initialize the File field
     *
     * @param {string} name
     *
     * @return {File}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a new File
     *
     * @return {File}
     *
     */
    static make(name: string, attribute?: string) {
        return new File(name, attribute)
    }
}
