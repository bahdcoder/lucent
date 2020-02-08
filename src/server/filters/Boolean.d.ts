import { Filter } from './Filter';
export declare class BooleanFilter extends Filter {
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
     * @return {Array}
     */
    default(): Array<any>;
}
