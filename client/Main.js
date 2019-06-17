import React from 'react'
import Pangaso from './Pangaso'
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
     * Pass setState to Pangaso instance
     *
     */
    componentDidMount() {
        Pangaso.setState = this.setState.bind(this)
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
                            <div className="w-full text-white bg-indigo-darkest h-12 flex items-center justify-center text-lg">
                                Pangaso
                            </div>
                            {/** Register all sidebar items for tools */}
                            <div className="py-8 px-8">
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
                        <Route
                            render={({ location }) => (
                                <div className="p-12">
                                    {/* <TransitionGroup>
                                    <CSSTransition
                                        timeout={300}
                                        classNames='fade'
                                    >
                                        <Switch location={location}>
                                            {this.state.routes.map(
                                                ({ path, component: Component }) => (
                                                    <Route
                                                        exact
                                                        key={path}
                                                        path={path}
                                                        render={props => (
                                                            <Component {...props} Link={Link} />
                                                        )}
                                                    />
                                                )
                                            )}
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup> */}
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
                        {/** By default, pangaso will come with two tools: Dashboard & Resources tools  */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
