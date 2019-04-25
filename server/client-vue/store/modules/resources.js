import client from '@client/utils/axios'

export const GET_RESOURCE = 'GET_RESOURCE'
export const GET_RESOURCES = 'GET_RESOURCES'
export const FETCH_RESOURCE = 'FETCH_RESOURCE'
export const POST_RUN_ACTION = 'POST_RUN_ACTION'
export const DELETE_RESOURCES = 'DELETE_RESOURCES'

export default {
    state: {
        resources: [],
        isFetching: true
    },
    actions: {
        /**
         *
         * Make api request to get all resources
         *
         * @return {Promise}
         *
         */
        [GET_RESOURCES]: ({ commit }) =>
            client.get('resources').then(({ data }) => {
                commit(GET_RESOURCES, data)
            }),

        /**
         *
         * Make api request to fetch data for this resource
         *
         * @return {Promise}
         *
         */
        [FETCH_RESOURCE]: (ctx, { slug, page }) =>
            client.get(`resources/${slug}?page=${page}`),

        /**
         * Delete resources with specified primary keys
         *
         * @return {Promise}
         *
         */
        [DELETE_RESOURCES]: (ctx, { slug, resources }) =>
            client.delete(`resources/${slug}`, {
                data: {
                    resources
                }
            }),

        /**
         *
         * Get resource
         *
         * @return {Promise}
         *
         */
        [GET_RESOURCE]: (ctx, { slug, primaryKey }) =>
            client.get(`resources/${slug}/${primaryKey}`),

        /**
         *
         * Post run action
         *
         * @return {Promise}
         *
         */
        [POST_RUN_ACTION]: (ctx, { slug, resources, action }) =>
            client.post(`resources/${slug}/run-action`, { resources, action })
    },

    mutations: {
        [GET_RESOURCES](state, data) {
            state.resources = data
            state.isFetching = false
        }
    },

    getters: {
        /**
         *
         * Get a single resource by slug
         *
         * @param {Object} state
         *
         * @return {Function}
         *
         */
        resource: state => slug =>
            state.resources.find(resource => resource.slug === slug),

        /**
         *
         * Get the resources current user is authorized to see
         *
         * @param {Object} state
         *
         * @return {Array}
         *
         */
        resourcesAuthorizedToSee: state =>
            state.resources.filter(resource => resource.authorizedToSee)
    }
}
