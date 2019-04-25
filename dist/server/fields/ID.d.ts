import { Field } from './Field';
export declare class ID extends Field {
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
     * Initialize the ID field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new ID
     *
     * @return {ID}
     *
     */
    static make(name: string, attribute?: string): ID;
}
