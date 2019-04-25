import * as Axios from 'axios'
import * as React from 'react'
import classnames from 'classnames'

interface ResourcePropsInterface {
    match: {
        params: {
            resource: string
        }
    }
    Link: React.FunctionComponent<{ to: string; className: string }>
}

interface ResourceStateInterface {
    isFetching: boolean
    data: {
        total: number
        data: Array<any>
    }
    selected: any[]
    selectedAction: any
    multiDeleting: boolean
    resource: any
    currentlyDeleting: string
    runningAction: boolean
}

class Resource extends React.Component<
    ResourcePropsInterface,
    ResourceStateInterface
> {
    state: ResourceStateInterface = {
        data: {
            total: 0,
            data: []
        },
        selected: [],
        isFetching: true,
        selectedAction: {},
        multiDeleting: false,
        currentlyDeleting: '',
        runningAction: false,
        resource: this.getCurrentResource()
    }

    /**
     *
     * Fetch resource data when component is mounted
     *
     */
    async componentDidMount() {
        this.fetchData()
    }

    /**
     *
     * Get the current resource based on resource param
     *
     */
    getCurrentResource(slug: string = this.props.match.params.resource) {
        return (window as any).Pangaso.resources.find(
            (resource: any) => resource.slug === slug
        )
    }

    /**
     *  
     * Trigger multi delete confirm modal
     * 
     */
    triggerMultiDelete = (currentlyDeleting?: string) =>
        this.setState({
            currentlyDeleting,
            multiDeleting: !this.state.multiDeleting
        })

    /**
     * 
     * Trigger confirmation to run an action
     *
     */
    triggerRunAction = () =>
        this.setState({
            runningAction: !this.state.runningAction
        })

    /**
     *
     * Fetch the data for a specific resource
     *
     */
    fetchData = () => {
        ;(window as any).Pangaso.request()
            .get(`resources/${this.props.match.params.resource}`)
            .then(({ data }: Axios.AxiosResponse) => {
                this.setState({
                    data,
                    isFetching: false
                })
            })
    }

    /**
     * Fetch data for new resource if resource param has changed.
     *
     * @param {ResourcePropsInterface} nextProps
     *
     * @return {void}
     *
     */
    componentWillReceiveProps(nextProps: ResourcePropsInterface) {
        if (
            nextProps.match.params.resource !== this.props.match.params.resource
        ) {
            this.setState(
                {
                    isFetching: true,
                    resource: this.getCurrentResource(
                        nextProps.match.params.resource
                    )
                },
                () => this.fetchData()
            )
        }
    }

    /**
     *
     * Set the selected action
     *
     * @param {React.SyntheticEvent} event
     *
     */
    setSelectedAction = (event: React.SyntheticEvent) => {
        const selectedAction = this.state.resource.actions.find((action: any) => action.id === (event.target as any).value)

        if (! selectedAction) return

        this.setState({
            selectedAction
        })
    }

    /**
     * Delete resources
     *
     */
    delete = () => {
        ;(window as any).Pangaso.request()
            .delete(`/resources/${this.state.resource.slug}`, {
                data: {
                    resources: this.state.selected.length > 0 ? this.state.selected : [this.state.currentlyDeleting]
                }
            })
            .then(() => {
                this.setState(
                    {
                        selected: [],
                        isFetching: true,
                        multiDeleting: false,
                        currentlyDeleting: ''
                    },
                    () => this.fetchData()
                );

                (window as any).Pangaso.success(`${this.state.resource.name}${this.state.selected.length > 1 ? 's' : ''} deleted !`)
            })
    }

    /**
     *
     * Select all rows
     *
     */
    private selectAll = () => {
        this.setState({
            selected:
                this.state.selected.length === this.state.data.data.length
                    ? []
                    : this.state.data.data.map(
                          (item: any) => item[this.state.resource.primaryKey]
                      )
        })
    }

    /**
     * 
     * Make API call to run a specific action
     * on a resource
     * 
     */
    private runAction = () => {
        (window as any).Pangaso.request()
            .post(`/resources/${this.state.resource.slug}/run-action`, {
                resources: this.state.selected,
                action: this.state.selectedAction.id
            })

            /**
             * 
             * Once action has be successfully run,
             * empty the selected list, and
             * the selectedAction
             * 
             */
            .then(() => {
                this.setState({
                    selected: [],
                    selectedAction: '',
                    runningAction: false
                });

                (window as any).Pangaso.success('Action run !')
            })
    }

    /**
     *
     * Get the fields shown for creation
     *
     * @return {array}
     *
     */
    private getIndexFields = (): Array<any> =>
        this.state.resource.fields.filter(
            (field: any) => !field.hideOnIndexPage
        )

    /**
     *
     * Toggle select for an item
     *
     */
    private toggleSelect = (item: any) => {
        const { primaryKey } = this.state.resource

        this.setState({
            selected: this.state.selected.includes(item[primaryKey])
                ? this.state.selected.filter((i: any) => i !== item[primaryKey])
                : [...this.state.selected, item[primaryKey]]
        })
    }

    render() {
        const { Link } = this.props
        const Modal = (window as any).Pangaso.components['component-modal']
        const Table = (window as any).Pangaso.components['component-table']
        const Button = (window as any).Pangaso.components['component-button']
        const Loader = (window as any).Pangaso.components['component-loader']
        const { resource, data, selectedAction, selected, runningAction, multiDeleting } = this.state

        return (
            <React.Fragment>
                <h1 className="font-thin text-3xl mb-2">{resource.title}</h1>

                <div className="flex justify-between items-center">
                    <div className="w-1/5 flex items-center">
                        <svg
                            className="absolute ml-3 z-5 text-grey fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            aria-labelledby="search"
                            role="presentation"
                        >
                            <path
                                fillRule="nonzero"
                                d="M14.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387a8 8 0 1 1 1.414-1.414zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full text-grey-darkest my-3 h-10 pr-3 pl-10 rounded-lg shadow focus:outline-none focus:border-indigo focus:border-2"
                        />
                    </div>

                    <Button
                        link
                        label={`Create ${resource.name}`}
                        to={`/resources/${resource.slug}/new`}
                    />
                </div>

                {this.state.isFetching ? (
                    <Loader />
                ) : (
                    <Table
                        Link={Link}
                        rows={data.data}
                        resource={resource}
                        selected={selected}
                        selectAll={this.selectAll}
                        headers={this.getIndexFields()}
                        selectedAction={selectedAction}
                        toggleSelect={this.toggleSelect}
                        triggerRunAction={this.triggerRunAction}
                        setSelectedAction={this.setSelectedAction}
                        triggerMultiDelete={this.triggerMultiDelete}
                    />
                )}
                <Modal
                    open={multiDeleting}
                    action={{
                        type: 'danger',
                        label: 'Delete',
                        handler: this.delete
                    }}
                    renderContent={() => (
                        <p className="text-grey-dark">
                            {`Are you sure you want to delete ${
                                (selected.length > 1 || '') ? selected.length : 'this'
                            } resource${selected.length > 1 ? 's' : ''}?`}
                        </p>
                    )}
                    title="Delete Resource"
                    cancel={this.triggerMultiDelete}
                />
                <Modal
                    open={runningAction}
                    action={{
                        label: 'Run Action',
                        handler: this.runAction,
                        type: selectedAction.isDestructive ? 'danger' : 'primary'
                    }}
                    renderContent={() => (
                        <p className="text-grey-dark">
                            {`Are you sure you want to run this action on ${selected.length} resource${selected.length > 1 ? 's' : ''}?`}
                        </p>
                    )}
                    title={selectedAction.name}
                    cancel={this.triggerRunAction}
                />
            </React.Fragment>
        )
    }
}

export default Resource
