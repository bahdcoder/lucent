import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'

Lucent.booting(({ route, sidebar, user }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    /**
     *
     * Define the route for displaying the dashboard
     *
     */
    user && route('/', Dashboard)
})
