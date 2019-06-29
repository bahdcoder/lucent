const { BooleanFilter } = require(process.env.CI_ENVIRONMENT
    ? '../dist/server/main'
    : 'pangaso')

class ContactRole extends BooleanFilter {
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
        return builder.filter({ role: { $in: value } })
    }

    name() {
        return 'Role'
    }

    options() {
        return [
            {
                label: 'Administrator',
                value: 'admin'
            },
            {
                label: 'Manager',
                value: 'manager'
            }
        ]
    }
}

module.exports = ContactRole
