/**
 *
 * Define a mixin for resources
 *
 * @return {Object}
 *
 */
export default {
    /**
     *
     * Computed properties of resource
     *
     * @type {Object}
     *
     */
    computed: {
        /**
         *
         * Get a specific resource based on route slug
         *
         * @return {Object}
         *
         */
        resource() {
            const resource = this.$store.getters.resource(
                this.$route.params.slug
            )

            if (!resource) return {}

            switch (this.$route.name) {
                case 'resource':
                    return {
                        ...resource,
                        fields: resource.fields.filter(
                            field =>
                                field.type !== 'Textarea' &&
                                field.type !== 'Trix' &&
                                field.type !== 'Password'
                        )
                    }
                case 'addResource':
                    return {
                        ...resource,
                        fields: resource.fields.filter(
                            field => field.type !== 'ID'
                        )
                    }
                case 'updateResource':
                    return {
                        ...resource,
                        fields: resource.fields.filter(
                            field => field.type !== 'ID'
                        )
                    }
                default:
                    return resource
            }
        }
    }
}
