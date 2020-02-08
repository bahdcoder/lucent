import { Field } from './Field';
import { IField } from '../index.d';
export declare class HasManyEmbedded extends Field {
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
     * Initialize a HasManyEmbedded instance
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
     * Make a HasManyEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasManyEmbedded}
     *
     */
    static make(name: string, attribute?: string): HasManyEmbedded;
    /**
     *
     * Define the fields for this embedded resource
     *
     * @param fields {IField}
     *
     * @return {HasManyEmbedded}
     *
     */
    withFields(fields: IField[]): this;
}
