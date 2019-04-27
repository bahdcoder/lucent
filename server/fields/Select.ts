import { Field } from './Field'
import * as ChangeCase from 'change-case'

interface SelectOptions {
    label: string
    value: string
}

export class Select extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Select'

    /**
     * Initialize the Select field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(
        public name: string,
        public options: SelectOptions[],
        public attribute: string = ''
    ) {
        super()

        this.name = name
        this.options = options
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a Select
     *
     * @return {Select}
     *
     */
    static make(name: string, options: SelectOptions[], attribute?: string) {
        return new Select(name, options, attribute)
    }
}
