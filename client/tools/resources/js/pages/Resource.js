import Axios from 'axios'
import React from 'react'
import classnames from 'classnames'

class Resource extends React.Component {
    state = {
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
    getCurrentResource(slug = this.props.match.params.resource) {
        return Pangaso.resources.find(
            resource => resource.slug === slug
        )
    }

    /**
     *  
     * Trigger multi delete confirm modal
     * 
     */
    triggerMultiDelete = (currentlyDeleting = null) =>
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
        Pangaso.request()
            .get(`resources/${this.props.match.params.resource}`)
            .then(({ data }) => {
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
    componentWillReceiveProps(nextProps) {
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
    setSelectedAction = (event) => {
        const selectedAction = this.state.resource.actions.find(action => action.id === event.target.value)

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
        Pangaso.request()
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

                Pangaso.success(`${this.state.resource.name}${this.state.selected.length > 1 ? 's' : ''} deleted !`)
            })
    }

    /**
     *
     * Select all rows
     *
     */
    selectAll = () => {
        this.setState({
            selected:
                this.state.selected.length === this.state.data.data.length
                    ? []
                    : this.state.data.data.map(
                          item => item[this.state.resource.primaryKey]
                      )
        })
    }

    /**
     * 
     * Make API call to run a specific action
     * on a resource
     * 
     */
    runAction = () => {
        Pangaso.request()
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

                Pangaso.success('Action run !')
            })
    }

    /**
     *
     * Get the fields shown for creation
     *
     * @return {array}
     *
     */
    getIndexFields = () =>
        this.state.resource.fields.filter(
            field => !field.hideOnIndexPage
        )

    /**
     *
     * Toggle select for an item
     *
     */
    toggleSelect = item => {
        const { primaryKey } = this.state.resource

        this.setState({
            selected: this.state.selected.includes(item[primaryKey])
                ? this.state.selected.filter(i => i !== item[primaryKey])
                : [...this.state.selected, item[primaryKey]]
        })
    }

    render() {
        const { Link } = this.props
        const Modal = Pangaso.components['component-modal']
        const Table = Pangaso.components['component-table']
        const Button = Pangaso.components['component-button']
        const Loader = Pangaso.components['component-loader']
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
