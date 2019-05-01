import Resource from './pages/Resource'
import Sidebar from './components/Sidebar'
import AddResource from './pages/AddResource'
import HasOneField from './components/Form/HasOne'
import HasManyField from './components/Form/HasMany'
import ResourceDetails from './pages/ResourceDetails'

Pangaso.booting(({ route, sidebar, field }) => {
    /**
     *
     * Define the sidebar items
     *
     */
    sidebar(Sidebar)

    /**
     *
     * Register a new has-one field component
     *
     */
    field('form-hasone', HasOneField)

    /**
     *
     * Register a new has-many field component
     *
     */
    field('form-hasmany', HasManyField)

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
