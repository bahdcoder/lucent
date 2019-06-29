import { Filter } from './Filter'

export class BooleanFilter extends Filter {
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    public component(): string {
        return 'filter-boolean'
    }

    /**
     *
     * Define default boolean values
     *
     * @return {Array}
     */
    public default(): Array<any> {
        return []
    }
}
