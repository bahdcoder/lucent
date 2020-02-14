import React from 'react'
import Lucent from './Lucent'
import Svg from './components/Svg'
import Loader from './components/Loader'
import OutsideClickHandler from 'react-outside-click-handler'
import { Route, Link, withRouter, Switch, Redirect } from 'react-router-dom'

class Main extends React.Component {
    /**
     *
     * Define component state
     *
     */
    state = {
        routes: {},
        user: null,
        booted: false,
        sidebarItems: [],
        dropdownOpen: false
    }

    /**
     *
     * Pass setState to Lucent instance
     *
     */
    componentDidMount() {
        Lucent.setState = this.setState.bind(this)
        Lucent.getState = (() => this.state).bind(this)
    }

    toggleDropdown = () =>
        this.setState({ dropdownOpen: !this.state.dropdownOpen })

    renderRouteWithSwitch = () => {
        const NoMatch = () => (
            <Redirect to={this.state.user ? '/' : '/auth/login'} />
        )

        return (
            <Route
                render={({ location }) => (
                    <Switch location={location}>
                        {Object.keys(this.state.routes).map(
                            (path, index) => {
                                const Component = this.state.routes[path]

                                return (
                                    <Route
                                        exact
                                        key={index}
                                        path={path}
                                        render={props => (
                                            <Component {...props} Link={Link} />
                                        )}
                                    />
                                )
                            }
                        )}
                        <Route component={NoMatch} />
                    </Switch>
                )}
            />
        )
    }

    handleLogout = () => {
        Lucent.request()
            .post('/auth/logout')
            .then(() => {
                window.location.href = '/auth/login'
            })
    }

    /**
     *
     * Render the main component
     *
     * @return {JSX}
     *
     */
    render() {
        if (!this.state.booted) return <Loader />

        if (!this.state.user)
            return (
                <div className="flex w-full">
                    {this.renderRouteWithSwitch()}
                </div>
            )

        console.log(this.state.user)

        return (
            <React.Fragment>
                <div className="flex">
                    <div className="w-72 flex bg-gray-800 min-h-screen">
                        <div className="w-full">
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

                            <div className="flex items-center relative">
                                <img
                                    alt="logged in user avatar"
                                    className="rounded-full w-8 h-8"
                                    src={`https://api.adorable.io/avatars/80/${this.state.user.email}.png`}
                                />
                                <span
                                    onClick={this.toggleDropdown}
                                    className="flex items-center font-light text-gray-700 inline-block ml-3 cursor-pointer"
                                >
                                    <span className="mr-1">
                                        {this.state.user.name}
                                    </span>

                                    <Svg icon="caret" />
                                </span>

                                {this.state.dropdownOpen && (
                                    <OutsideClickHandler
                                        onOutsideClick={this.toggleDropdown}
                                    >
                                        <div
                                            className="w-72 bg-white absolute shadow border rounded-lg border-gray-400 transition duration-150 ease-in-out"
                                            style={{
                                                top: '40px',
                                                right: '5px'
                                            }}
                                        >
                                            <nav className="flex flex-col my-3">
                                                <span
                                                    onClick={this.handleLogout}
                                                    className="w-full hover:bg-gray-200 text-gray-700 py-2 px-4 cursor-pointer transition duration-150 ease-in-out"
                                                >
                                                    Logout
                                                </span>
                                            </nav>
                                        </div>
                                    </OutsideClickHandler>
                                )}
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
