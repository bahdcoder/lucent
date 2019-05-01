import { Field } from './Field';
export declare class HasMany extends Field {
    /**
     * Define a type for this field
     *
     * @var {String}
     *
     */
    type: string;
    /**
     *
     * Declare the resource this field relates to
     *
     * @type {String}
     *
     */
    resource: string | null;
    /**
     *
     * Initialize a HasMany instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    constructor(name: string, attribute?: string, resource?: string);
    /**
     * Make a HasMany Instance
     *
     * @param {string} name the name of the relationship
     *
     * @param {string} attribute the name of the attribute on this resource
     *
     * @param {string} resource the name of the matching related resource
     *
     * @param  {...any} args
     *
     * @return {HasMany}
     *
     */
    static make(name: string, attribute?: string, resource?: string): HasMany;
}
