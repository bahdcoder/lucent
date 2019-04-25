import Vue from 'vue'
import store from './store'
import router from './router'
import Form from '@utils/Form'
import Router from 'vue-router'
import '@client/styles/main.scss'
import Main from '@pages/Main.vue'
import Paginate from 'vuejs-paginate'
import classesMixin from '@/client/mixins/classes'
import resourceMixin from '@/client/mixins/resource'

Vue.use(Router)
Vue.mixin(classesMixin)
Vue.mixin(resourceMixin)
Vue.component('paginate', Paginate)

window.Pangaso = {
    Form
}

window.Bus = new Vue()

export default new Vue({ el: '#app', router, store, render: h => h(Main) })
