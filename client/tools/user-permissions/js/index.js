import Sidebar from './components/Sidebar'

// pages
import Login from './pages/Login'

Lucent.booting(({ sidebar, component, route }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    component('user-permissions-login', Login)

    route('/auth/login', Login)
})
