import { Field } from './Field';
export declare class Password extends Field {
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
     * Initialize the Password field
     *
     * @param {string} name
     *
     * @return {voPassword}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new Password
     *
     * @return {Password}
     *
     */
    static make(name: string, attribute?: string): Password;
}
