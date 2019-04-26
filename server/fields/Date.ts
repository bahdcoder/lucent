import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Date extends Field {
    /**
     * Define the type for this field
     *
     * @type {String}
     *
     */
    public type: string = 'Date'

    /**
     *
     * Define the format for this date
     *
     * @type {String}
     *
     */
    public dateFormat: string = 'YYYY-MM-DD mm:ss'

    /**
     *
     * Define a property to check if this date
     * field should have time
     *
     *
     * @type {Boolean}
     *
     */
    public enableTime: boolean = false

    constructor(name: string, attribute?: string) {
        super()

        this.name = name
        this.attribute = attribute || ChangeCase.camelCase(this.name)
    }

    /**
     *
     * Make a new Date
     *
     * @return {Date}
     *
     */
    static make(name: string, attribute?: string) {
        return new Date(name, attribute)
    }

    /**
     *
     * Set time to true, to create a date time field
     *
     * @return {Date}
     *
     */
    public withTime(): Date {
        this.enableTime = true

        return this
    }

    /**
     *
     * Define the format used for this field
     *
     * @return {Date}
     *
     */
    public format(format: string): Date {
        this.dateFormat = format

        return this
    }
}
