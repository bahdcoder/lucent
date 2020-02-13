const { ID, Resource } = require('lucent-admin')

class User extends Resource {
    /**
     *
     * Define the fields for this resource
     *
     * @return {array}
     *
     */
    fields() {
        return [
            ID.make('ID')
        ]
    }
}

module.exports = User
