import { Field } from './Field';
import { IField } from '../index.d';
export declare class HasOneEmbedded extends Field {
    /**
     *
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
     * This declares the fields variable. Will save the
     *
     *
     * @type {IField}
     *
     */
    fields: IField[];
    /**
     *
     * Initialize a HasOneEmbedded instance
     *
     * @param {String} name the name of the field this resource
     *
     * @param {string}  attribute the matching attribute field
     *
     * @return {null}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a HasOneEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasOneEmbedded}
     *
     */
    static make(name: string, attribute?: string): HasOneEmbedded;
    /**
     *
     * Define the fields for this embedded resource
     *
     * @param fields {IField}
     *
     * @return {HasOneEmbedded}
     *
     */
    withFields(fields: IField[]): this;
}
