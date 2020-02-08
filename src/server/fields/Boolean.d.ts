import { Field } from './Field';
export declare class Boolean extends Field {
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
     * Initialize the Boolean field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a Boolean
     *
     * @return {Boolean}
     *
     */
    static make(name: string, attribute?: string): Boolean;
}
