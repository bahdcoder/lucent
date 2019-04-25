import Router from 'vue-router'
import Auth from '@pages/Auth.vue'
import NotFound from '@pages/404.vue'
import Resource from '@pages/Resource.vue'
import Dashboard from '@pages/Dashboard.vue'
import AddResource from '@pages/AddResource.vue'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: Dashboard
        },
        {
            path: '/auth',
            component: Auth
        },
        {
            path: '/resources/:slug',
            component: Resource,
            name: 'resource'
        },
        {
            path: '/resources/:slug/:resource/edit',
            component: AddResource,
            name: 'updateResource'
        },
        {
            path: '/resources/:slug/new',
            component: AddResource,
            name: 'addResource'
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
