import { Field } from './Field';
export declare class HasOne extends Field {
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
     * Initialize a HasOneEmbedded instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    constructor(name: string, resource: string, attribute?: string);
    /**
     * Make a HasOneEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasOne}
     *
     */
    static make(name: string, resource: string, attribute?: string): HasOne;
}
