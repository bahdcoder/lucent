import React from 'react'
import Lucent from './Lucent'
import { Route, Link, withRouter, Switch } from 'react-router-dom'

export class Main extends React.Component {
    /**
     *
     * Define component state
     *
     */
    state = {
        routes: [],
        sidebarItems: []
    }

    /**
     *
     * Pass setState to Lucent instance
     *
     */
    componentDidMount() {
        Lucent.setState = this.setState.bind(this)
    }

    /**
     *
     * Render the main component
     *
     * @return {JSX}
     *
     */
    render() {
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
                                    className="rounded-full w-10 h-10"
                                    src="https://www.gravatar.com/avatar/24aa5f3c4b87e7e2d003fbf8b68aad7a?d=https%3A%2F%2Fui-avatars.com%2Fapi%2FFrantz%2BKati"
                                    alt=""
                                />
                                <span className="font-light text-gray-700 inline-block ml-3">
                                    Frantz Kati
                                </span>
                            </div>
                        </div>
                        {/** Loop through all registered tools and display them here. */}
                        <Route
                            render={({ location }) => (
                                <div className="p-16">
                                    <Switch location={location}>
                                        {this.state.routes.map(
                                            (
                                                { path, component: Component },
                                                index
                                            ) => (
                                                <Route
                                                    exact
                                                    key={index}
                                                    path={path}
                                                    render={props => (
                                                        <Component
                                                            {...props}
                                                            Link={Link}
                                                        />
                                                    )}
                                                />
                                            )
                                        )}
                                    </Switch>
                                </div>
                            )}
                        />
                        {/** By default, Lucent will come with two tools: Dashboard & Resources tools  */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
