import React from 'react'
import classnames from 'classnames'
import QueryString from 'query-string'
import { debounce } from 'throttle-debounce'

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
        runningAction: false,
        currentlyDeleting: '',
        resource: this.getCurrentResource(),
        page: this.getQueryParams().page || 1,
        query: this.getQueryParams().query || '',
    }

    /**
     * 
     * Get parsed query parameters
     * 
     */
    getQueryParams() {
        return QueryString.parse(this.props.location.search)
    }

    /**
     * 
     * Get all the query params
     * 
     * @return {Object}
     * 
     */
    params = () => QueryString.parse(this.props.location.search)

    /**
     * 
     * Get stringified version of params
     * 
     * @return {string}
     * 
     */
    paramsString = () => QueryString.stringify({
        page: this.state.page || 1,
        query: this.state.query || ''
    })

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
        return (
            this.props.resource ||
            Pangaso.resources.find(resource => resource.slug === slug)
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
     * Update the window location with the latest params
     * 
     * @return {null}
     * 
     */
    updateWindowLocation = () => {
        const { resource, history, location } = this.props

        !resource && history.push(`${location.pathname}?${this.paramsString()}`)
    }

    /**
     *
     * Fetch the data for a specific resource
     *
     */
    fetchData = debounce(500, () => {
        this.updateWindowLocation()
        const { resource, parentRecord, parentResource, field } = this.props

        let url = resource
            ? `/resources/${parentResource.slug}/${
                  parentRecord[parentResource.primaryKey]
              }/has-many/${field.attribute}`
            : `resources/${this.props.match.params.resource}`

        url = `${url}?${this.paramsString()}`

        Pangaso.request()
            .get(url)
            .then(({ data }) => {
                this.setState({
                    data,
                    isFetching: false
                })
            })
    })

    /**
     *
     * Handle page change
     *
     */
    handlePageChange = ({ selected }) => {
        const { history, resource } = this.props

        const page = selected + 1

        /**
         *
         * If this is the resource page, then add the page
         * to query parameters
         *
         */
        if (!resource) {
            // history.push(`${history.location.pathname}?page=${page}`)
        }

        this.setState(
            {
                page,
                selected: [],
                isFetching: true
            },
            () => this.fetchData()
        )
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
                    page: 1,
                    query: '',
                    isFetching: true,
                    resource: this.getCurrentResource(
                        nextProps.match.params.resource
                    )
                },
                () => this.fetchData()
            )
        }
    }

    handleQueryChange = event => {
        this.setState({
            isFetching: true,
            query: event.target.value
        }, () => {
            this.updateWindowLocation()
            this.fetchData()
        })
    }

    /**
     *
     * Search the server with specific query
     *
     * @return {null}
     *
     */
    search = debounce(500, () => {
        const { resource } = this.props
        const { query, page, history, location } = this.state

        history.push(`${location.pathname}`)

        Pangaso.request()
            .get(`/resources/${resource.slug}/search?query=${query}`)
            .then(({ data }) => {
                
            })
    })

    /**
     *
     * Set the selected action
     *
     * @param {React.SyntheticEvent} event
     *
     */
    setSelectedAction = event => {
        const selectedAction = this.state.resource.actions.find(
            action => action.id === event.target.value
        )

        if (!selectedAction) return

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
                    resources:
                        this.state.selected.length > 0
                            ? this.state.selected
                            : [this.state.currentlyDeleting]
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
                )

                Pangaso.success(
                    `${this.state.resource.name}${
                        this.state.selected.length > 1 ? 's' : ''
                    } deleted !`
                )
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
                this.setState(
                    {
                        selected: [],
                        isFetching: true,
                        selectedAction: '',
                        runningAction: false
                    },
                    () => this.fetchData()
                )

                Pangaso.success('Action run !')
            })

            .catch(() => {
                this.setState({
                    runningAction: false
                })
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
        this.state.resource.fields.filter(field => !field.hideOnIndexPage)

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
        const { Link, viewChildResource } = this.props
        const Svg = Pangaso.components['component-svg']
        const Modal = Pangaso.components['component-modal']
        const Table = Pangaso.components['component-table']
        const Button = Pangaso.components['component-button']
        const Loader = Pangaso.components['component-loader']
        const {
            data,
            page,
            query,
            resource,
            selected,
            runningAction,
            multiDeleting,
            selectedAction
        } = this.state

        return (
            <React.Fragment>
                <h1
                    data-testid={`resource-title-${resource.slug}`}
                    className={classnames('font-thin mb-2', {
                        'text-2xl': this.props.resource,
                        'text-3xl': !this.props.resource
                    })}
                >
                    {resource.title}
                </h1>

                <div className="flex justify-between items-center">
                    <div className="w-1/5 flex items-center">
                        <Svg
                            icon="lens"
                            className="absolute ml-3 z-5 text-grey"
                        />
                        <input
                            type="text"
                            value={query}
                            placeholder="Search"
                            onChange={this.handleQueryChange}
                            className="w-full text-grey-darkest my-3 h-10 pr-3 pl-10 rounded-lg shadow focus:outline-none focus:border-indigo focus:border-2"
                        />
                    </div>

                    <Button
                        link
                        label={`Create ${resource.name}`}
                        to={`/resources/${resource.slug}/new`}
                        dataTestId={`create-resource-${resource.slug}`}
                    />
                </div>

                {this.state.isFetching ? (
                    <Loader />
                ) : (
                    <Table
                        page={page}
                        Link={Link}
                        rows={data.data}
                        total={data.total}
                        resource={resource}
                        selected={selected}
                        selectAll={this.selectAll}
                        headers={this.getIndexFields()}
                        selectedAction={selectedAction}
                        toggleSelect={this.toggleSelect}
                        onPageChange={this.handlePageChange}
                        viewChildResource={viewChildResource}
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
                                selected.length > 1 || ''
                                    ? selected.length
                                    : 'this'
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
                        type: selectedAction.isDestructive
                            ? 'danger'
                            : 'primary'
                    }}
                    renderContent={() => (
                        <p className="text-grey-dark">
                            {`Are you sure you want to run this action on ${
                                selected.length
                            } resource${selected.length > 1 ? 's' : ''}?`}
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
