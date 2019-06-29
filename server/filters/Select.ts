import { Filter } from './Filter'

export class SelectFilter extends Filter {
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    public component(): string {
        return 'filter-select'
    }
}
