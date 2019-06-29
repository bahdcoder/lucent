import * as ChangeCase from 'change-case'

import { IFilter } from '../index.d'

export class Filter implements IFilter {
    /**
     * Define the name of the filter
     *
     * @return {string}
     */
    public name(): string {
        return ChangeCase.sentenceCase(this.constructor.name)
    }

    /**
     *
     * Define the attribute of the filter
     */
    public attribute(): string {
        return ChangeCase.camelCase(this.constructor.name)
    }

    /**
     *
     * Define the name of the component too be used on client side
     * This will also be used to determine the type of the filter.
     * For example, boolean filters will have {form-boolean}
     *
     * @return {string}
     */
    public component(): string {
        return ''
    }

    /**
     *
     * Define the default value of a filter
     *
     * @return {string}
     */
    public default(): any {
        return ''
    }

    /**
     *
     * Define the options of this filter
     *
     * @return {Array}
     */
    public options(): Array<any> {
        return []
    }

    /**
     *
     * Apply the filter to the given query.
     *
     * @param {object} request express request object
     * @param {object} builder mongodb builder cursor
     * @param {mixed} value selected filter value from frontend
     *
     * @return {object}
     *
     */
    public apply() {}

    /**
     * Serialize the filter for the frontend
     *
     * @return {object}
     */
    public serialize() {
        return {
            ...this,
            name: this.name(),
            default: this.default(),
            options: this.options(),
            attribute: this.attribute(),
            component: this.component()
        }
    }
}
