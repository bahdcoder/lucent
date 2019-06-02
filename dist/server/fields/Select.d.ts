import { Field } from './Field';
interface SelectOptions {
    label: string;
    value: string;
}
export declare class Select extends Field {
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
     *
     * Define the options for this select field
     *
     * @var {Array[SelectOptions]}
     */
    options: SelectOptions[];
    /**
     * Initialize the Select field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     * Set the options for select
     *
     * @param options SelectOptions[]
     *
     * @return {Select}
     *
     */
    withOptions(options: SelectOptions[]): this;
    /**
     *
     * Make a Select
     *
     * @return {Select}
     *
     */
    static make(name: string, attribute?: string): Select;
}
export {};
