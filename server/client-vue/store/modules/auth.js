import client from '@client/utils/axios'

export const POST_LOGIN = 'POST_LOGIN'

export default {
    actions: {
        /**
         *
         * Make api request to login a user
         *
         * @return {Promise}
         *
         */
        [POST_LOGIN]: (ctx, data) => client.post('auth/login', data)
    }
}
