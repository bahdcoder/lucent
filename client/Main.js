import React from 'react'
import Pangaso from './Pangaso'
import { Route, Link, withRouter } from 'react-router-dom'

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
     * Pass setState to Pangaso instance
     *
     */
    componentDidMount() {
        Pangaso.setState = this.setState.bind(this)
    }

    componentDidCatch(error, info) {
        console.log('ERROR----X-XX--XXX--XXXX--XXXXX----------------------->', error, info)
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
                    <div className="w-1/8 flex min-h-screen">
                        <div className="bg-indigo-darker w-full">
                            <div className="w-full text-white bg-indigo-darkest h-16 flex items-center justify-center text-lg">
                                Pangaso
                            </div>
                            {/** Register all sidebar items for tools */}
                            <div className="py-16 px-8">
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
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white flex items-center shadow h-16 px-6">
                            <input
                                type="text"
                                placeholder="Search"
                                className="text-grey-darkest w-1/4 border border-grey focus:outline-none rounded-lg py-2 px-6"
                            />
                        </div>
                        {/** Loop through all registered tools and display them here. */}
                        <div className="p-12">
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
                        </div>
                        {/** By default, pangaso will come with two tools: Dashboard & Resources tools  */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
