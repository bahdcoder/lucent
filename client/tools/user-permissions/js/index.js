import Sidebar from './components/Sidebar'

// pages
import Login from './pages/Login'

Lucent.booting(({ sidebar, route }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    route('/auth/login', Login)
})
