import { Field } from './Field';
export declare class HasMany extends Field {
    name: string;
    resource: string;
    attribute: string;
    /**
     * Define the type of thie field
     *
     * @var {String}
     *
     */
    type: string;
    /**
     * Create a new instance of this field
     *
     * @param {string }name
     * @param {string} resource
     * @param {string} attribute
     *
     * @return {void}
     *
     */
    constructor(name: string, resource: string, attribute?: string);
    /**
     *
     * Create a new HasMany relationship instance
     *
     * @return {HasMany}
     *
     */
    static make(name: string, resource: string, attribute?: string): HasMany;
}
