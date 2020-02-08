import { Field } from './Field';
export declare class Num extends Field {
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
     * Initialize the Num field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new Num
     *
     * @return {Num}
     *
     */
    static make(name: string, attribute?: string): Num;
}
