import { IFilter } from '../index.d';
export declare class Filter implements IFilter {
    /**
     * Define the name of the filter
     *
     * @return {string}
     */
    name(): string;
    /**
     *
     * Define the attribute of the filter
     */
    attribute(): string;
    /**
     *
     * Define the name of the component too be used on client side
     * This will also be used to determine the type of the filter.
     * For example, boolean filters will have {form-boolean}
     *
     * @return {string}
     */
    component(): string;
    /**
     *
     * Define the default value of a filter
     *
     * @return {string}
     */
    default(): any;
    /**
     *
     * Define the options of this filter
     *
     * @return {Array}
     */
    options(): Array<any>;
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
    apply(): void;
    /**
     * Serialize the filter for the frontend
     *
     * @return {object}
     */
    serialize(): this & {
        name: string;
        default: any;
        options: any[];
        attribute: string;
        component: string;
    };
}
