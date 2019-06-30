const { DateFilter } = require('pangaso')

class ContactEmployedAfter extends DateFilter {
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
    apply(request, builder, value) {
        return builder
    }

    withTime() {
        return false
    }

    dateFormat() {
        return 'YYYY-mm-dd'
    }
}

module.exports = ContactEmployedAfter
