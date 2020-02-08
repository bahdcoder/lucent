import { Field } from './Field';
export declare class Textarea extends Field {
    name: string;
    attribute: string;
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    type: string;
    /**
     * Define the number of rows for this textarea
     *
     * @var {number}
     *
     */
    rowsCount: number;
    /**
     *
     * This property removes the textarea toggle show/hide
     * functionality on the details screen
     *
     * @var {boolean}
     *
     */
    shouldAlwaysShow: boolean;
    /**
     * Initialize the Textarea field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new Textarea
     *
     * @return {Textarea}
     *
     */
    static make(name: string, attribute?: string): Textarea;
    /**
     * Set shouldAlwaysShow property to true
     *
     * @return {Textarea}
     *
     */
    alwaysShow(): this;
    /**
     *
     * Set the number of rows on this textarea
     *
     * @return {Textarea}
     *
     */
    rows(rowsCount: number): this;
}
