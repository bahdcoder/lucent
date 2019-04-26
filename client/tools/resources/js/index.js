import Resource from './pages/Resource'
import Sidebar from './components/Sidebar'
import AddResource from './pages/AddResource'
import ResourceDetails from './pages/ResourceDetails'

Pangaso.booting(({ route, sidebar }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    /**
     *
     * Define the route for displaying a resource
     *
     */
    route('/resources/:resource', Resource)

    /**
     *
     * Define a route for adding a resource
     *
     */
    route('/resources/:resource/new', AddResource)

    /**
     *
     * Define the route for editing a resource
     *
     */
    route('/resources/:resource/:primaryKey/edit', AddResource)

    /**
     *
     * Define the route for displaying the details of a resource
     *
     */
    route('/resources/:resource/:primaryKey/details', ResourceDetails)
})
