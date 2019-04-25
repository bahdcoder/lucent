import { Field } from './Field';
export declare class BelongsTo extends Field {
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
     * Initialize a BelongsTo instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    constructor(name: string, resource: string, attribute?: string);
    /**
     * Make a BelongsTo Instance
     *
     * @param  {...any} args
     *
     * @return {BelongsTo}
     *
     */
    static make(name: string, resource: string, attribute?: string): BelongsTo;
}
