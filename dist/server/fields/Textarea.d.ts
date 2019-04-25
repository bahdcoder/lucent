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
}
