import { Filter } from './Filter';
export declare class DateFilter extends Filter {
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    component(): string;
    /**
     *
     * Define default boolean values
     *
     * @return {Date}
     */
    default(): Date;
    /**
     * Define this date format used by the date picker
     *
     * @return {String}
     */
    dateFormat(): String;
    /**
     * Define if this filter date picker should have time
     *
     * @return {Boolean}
     */
    withTime(): Boolean;
    /**
 * Serialize the filter for the frontend
 *
 * @return {object}
 */
    serialize(): this & {
        name: string;
        default: Date;
        options: any[];
        attribute: string;
        component: string;
        dateFormat: String;
        enableTime: Boolean;
    };
}
