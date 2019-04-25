import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import resources from './modules/resources'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        resources
    }
})

export default store
