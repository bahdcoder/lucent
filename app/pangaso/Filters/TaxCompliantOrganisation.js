const { SelectFilter } = require('pangaso')

class TaxCompliantOrganisation extends SelectFilter {
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
        return builder.filter({ paidTaxes: value === 'true' })
    }

    name() {
        return 'Tax Compliant'
    }

    options() {
        return [
            {
                label: 'Yes',
                value: true
            },
            {
                label: 'No',
                value: false
            }
        ]
    }
}

module.exports = TaxCompliantOrganisation
