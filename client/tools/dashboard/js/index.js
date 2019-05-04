import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'

Pangaso.booting(({ route, sidebar }) => {
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
    route('/', Dashboard)

    /**
     *
     * Define the route for displaying the dashboard
     *
     */
    route('/dashboard', Dashboard)
})
