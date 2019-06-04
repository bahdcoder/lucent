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
     *
     * Define the options for this select field
     *
     * @var {Array[SelectOptions]}
     */
    public options: SelectOptions[] = []

    /**
     * Initialize the Select field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     * Set the options for select
     *
     * @param options SelectOptions[]
     *
     * @return {Select}
     *
     */
    public withOptions(options: SelectOptions[]) {
        this.options = options

        return this
    }

    /**
     *
     * Make a Select
     *
     * @return {Select}
     *
     */
    static make(name: string, attribute?: string) {
        return new Select(name, attribute)
    }
}
