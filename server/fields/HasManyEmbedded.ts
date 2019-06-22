import { Field } from './Field'
import { IField } from '../index.d'
import * as ChangeCase from 'change-case'

export class HasManyEmbedded extends Field {
    /**
     *
     * Define a type for this field
     *
     * @var {String}
     *
     */
    public type: string = 'HasManyEmbedded'

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
     * Initialize a HasManyEmbedded instance
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
     * Make a HasManyEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasManyEmbedded}
     *
     */
    static make(name: string, attribute?: string) {
        return new HasManyEmbedded(name, attribute)
    }

    /**
     *
     * Define the fields for this embedded resource
     *
     * @param fields {IField}
     *
     * @return {HasManyEmbedded}
     *
     */
    public withFields(fields: IField[]) {
        this.fields = fields

        return this
    }
}
