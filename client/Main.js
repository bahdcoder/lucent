import React from 'react'
import Lucent from './Lucent'
import Loader from './components/Loader'
import { Route, Link, withRouter, Switch } from 'react-router-dom'

class Main extends React.Component {
    /**
     *
     * Define component state
     *
     */
    state = {
        routes: [],
        user: null,
        booted: false,
        sidebarItems: [],
        loadingAuth: true,
        authToken: localStorage.getItem('authToken')
    }

    /**
     *
     * Pass setState to Lucent instance
     *
     */
    componentDidMount() {
        Lucent.setState = this.setState.bind(this)
        Lucent.getState = (() => this.state).bind(this)

        // check if user is logged in. if not, redirect to the login route
        this.fetchAuthUser()
    }

    fetchAuthUser() {
        if (!this.state.authToken) {
            this.setState({
                loadingAuth: false
            })

            return
        }
        // check if user is in local storage

        Lucent.request().get('/auth/me')
            .then(({ data }) => {
                this.setState({
                    loadingAuth: false,
                    user: data
                })

                if (['/auth/login'].includes(this.props.history.location.pathname)) {
                    this.props.history.push('/')
                }
            })
            .catch(() => {
                this.setState({
                    loadingAuth: false,
                    authToken: ''
                })

                localStorage.removeItem('authToken')

                this.props.history.push('/auth/login')
            })
    }

    renderRouteWithSwitch = () => {
        return (
            <Route
                render={({ location }) => (
                    <Switch location={location}>
                        {this.state.routes.map(
                            ({ path, component: Component }, index) => (
                                <Route
                                    exact
                                    key={index}
                                    path={path}
                                    render={props => (
                                        <Component {...props} Link={Link} />
                                    )}
                                />
                            )
                        )}
                    </Switch>
                )}
            />
        )
    }

    /**
     *
     * Render the main component
     *
     * @return {JSX}
     *
     */
    render() {
        if (!this.state.booted || this.state.loadingAuth) return <Loader />

        if (!this.state.user || !this.state.authToken)
            return (
                <div className="flex w-full">
                    {this.renderRouteWithSwitch()}
                </div>
            )

        return (
            <React.Fragment>
                <div className="flex">
                    <div className="w-72 flex min-h-screen">
                        <div className="bg-gray-800 w-full">
                            <div className="w-full text-white bg-gray-900 h-16 flex items-center px-6 text-lg">
                                Lucent Admin
                            </div>
                            {/** Register all sidebar items for tools */}
                            <>
                                {this.state.sidebarItems.map(
                                    (SidebarItem, index) => {
                                        const SidebarItemWithRouter = withRouter(
                                            SidebarItem
                                        )

                                        return (
                                            <SidebarItemWithRouter
                                                Link={Link}
                                                key={index}
                                            />
                                        )
                                    }
                                )}
                            </>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white w-full shadow-md flex justify-between items-center shadow h-16 px-16">
                            <input
                                type="text"
                                placeholder="Search"
                                className="block w-1/4 py-2 pl-12 pr-4 bg-gray-200 rounded-full border border-transparent focus:bg-white focus:border-gray-300 focus:outline-none"
                            />

                            <div className="flex items-center">
                                <img
                                    alt="logged in user avatar"
                                    className="rounded-full w-10 h-10"
                                    src={`https://api.adorable.io/avatars/80/${this.state.user.email}.png`}
                                />
                                <span className="font-light text-gray-700 inline-block ml-3">
                                    {this.state.user.name}
                                </span>
                            </div>
                        </div>
                        {/** Loop through all registered tools and display them here. */}
                        <div className="p-16">
                            {this.renderRouteWithSwitch()}
                        </div>
                        {/** By default, Lucent will come with two tools: Dashboard & Resources tools  */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Main)
