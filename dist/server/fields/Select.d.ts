import { Field } from './Field';
interface SelectOptions {
    label: string;
    value: string;
}
export declare class Select extends Field {
    name: string;
    options: SelectOptions[];
    attribute: string;
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    type: string;
    /**
     * Initialize the Select field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, options: SelectOptions[], attribute?: string);
    /**
     *
     * Make a Select
     *
     * @return {Select}
     *
     */
    static make(name: string, options: SelectOptions[], attribute?: string): Select;
}
export {};
