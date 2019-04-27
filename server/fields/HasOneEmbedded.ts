import { Field } from './Field'
import { IField } from '../index.d'
import * as ChangeCase from 'change-case'

export class HasOneEmbedded extends Field {
    /**
     *
     * Define a type for this field
     *
     * @var {String}
     *
     */
    public type: string = 'HasOneEmbedded'

    /**
     *
     * Declare the resource this field relates to
     *
     * @type {String}
     *
     */
    public resource: string | null = null

    /**
     * This declares the fields variable. Will save the
     *
     *
     * @type {IField}
     *
     */
    public fields: IField[] = []

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
    constructor(name: string, attribute?: string) {
        super()

        this.name = name
        this.attribute = attribute || ChangeCase.camelCase(this.name)

        this.hideOnIndex()
        this.hideOnDetail()
    }

    /**
     *
     * Make a HasOneEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasOneEmbedded}
     *
     */
    static make(name: string, attribute?: string) {
        return new HasOneEmbedded(name, attribute)
    }

    /**
     *
     * Define the fields for this embedded resource
     *
     * @param fields {IField}
     *
     * @return {HasOneEmbedded}
     *
     */
    public withFields(fields: IField[]) {
        this.fields = fields

        return this
    }
}
