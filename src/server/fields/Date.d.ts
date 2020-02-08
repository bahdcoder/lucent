import { Field } from './Field';
export declare class Date extends Field {
    /**
     * Define the type for this field
     *
     * @type {String}
     *
     */
    type: string;
    /**
     *
     * Define the format for this date
     *
     * @type {String}
     *
     */
    dateFormat: string;
    /**
     *
     * Define a property to check if this date
     * field should have time
     *
     *
     * @type {Boolean}
     *
     */
    enableTime: boolean;
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new Date
     *
     * @return {Date}
     *
     */
    static make(name: string, attribute?: string): Date;
    /**
     *
     * Set time to true, to create a date time field
     *
     * @return {Date}
     *
     */
    withTime(): Date;
    /**
     *
     * Define the format used for this field
     *
     * @return {Date}
     *
     */
    format(format: string): Date;
}
