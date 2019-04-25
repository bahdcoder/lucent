import Resource from './pages/Resource'
import Sidebar from './components/Sidebar'
import AddResource from './pages/AddResource'

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
     * Define the endpoint for editing a resource
     * 
     */
    route('/resources/:resource/:primaryKey/edit', AddResource)
})
