import Sidebar from './components/Sidebar'

// pages
import Login from './pages/Login'
import Register from './pages/Register'

Lucent.booting(({ sidebar, route }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    route('/auth/login', Login)
    route('/auth/register', Register)
})
