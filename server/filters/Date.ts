import { Filter } from './Filter'

export class DateFilter extends Filter {
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    public component(): string {
        return 'filter-date'
    }

    /**
     *
     * Define default boolean values
     *
     * @return {Date}
     */
    public default(): Date {
        return new Date()
    }

    /**
     * Define this date format used by the date picker
     *
     * @return {String}
     */
    public dateFormat(): String {
        return 'YYYY-mm-dd'
    }

    /**
     * Define if this filter date picker should have time
     *
     * @return {Boolean}
     */
    public withTime(): Boolean {
        return false
    }

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
            component: this.component(),
            dateFormat: this.dateFormat(),
            enableTime: this.withTime()
        }
    }
}
