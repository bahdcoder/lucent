import React from 'react'
import classnames from 'classnames'

class ResourceDetails extends React.Component {
    state = {
        data: {},
        deleting: false,
        resource: this.getCurrentResource()
    }

    /**
     *
     * Fetch the current resource details
     *
     */
    componentDidMount() {
        Pangaso.request()
            .get(
                `/resources/${this.state.resource.slug}/${
                    this.props.match.params.primaryKey
                }`
            )
            .then(({ data }) => {
                this.setState({
                    data
                })
            })
            .catch(() => {
                this.props.history.push(
                    `/resources/${this.state.resource.slug}`
                )
            })
    }

    /**
     *
     * Get the current resource based on resource param
     *
     */
    getCurrentResource(slug = this.props.match.params.resource) {
        return Pangaso.resources.find(resource => resource.slug === slug)
    }

    /**
     * 
     * Trigger the delete modal
     * 
     */
    triggerDelete = () => this.setState({
        deleting: !this.state.deleting
    })

    /**
     * 
     * Delete a resource
     * 
     */
    delete = () => {
        const { data, resource } = this.state
        Pangaso.request()
            .delete(`/resources/${resource.slug}`, {
                data: {
                    resources: [data[resource.primaryKey]]
                }
            })
            .then(() => {
                this.props.history.push(`/resources/${resource.slug}`)

                Pangaso.success(
                    `${resource.name} deleted !`
                )
            })
    }

    /**
     *
     * Render the JSX for component
     *
     * @return {JSX}
     *
     */
    render() {
        const { resource, data, deleting } = this.state

        const Svg = Pangaso.components['component-svg']
        const Link = Pangaso.components['component-link']
        const Modal = Pangaso.components['component-modal']

        return (
            <React.Fragment>
                <div className="flex justify-between items-center">
                    <h1 className="font-thin text-3xl mb-2">
                        {resource.name} Details
                    </h1>

                    <div>
                        <Link to={`/resources/${resource.slug}/${data[resource.primaryKey]}/edit`}>
                            <span className="bg-white trans-30 p-3 mr-3 shadow-md cursor-pointer rounded-lg">
                                <Svg
                                    icon="pencil"
                                    className="text-indigo hover:text-indigo-light"
                                />
                            </span>
                        </Link>
                        <span onClick={this.triggerDelete} className="bg-indigo p-3 trans-30 shadow-md cursor-pointer hover:bg-indigo-light rounded-lg">
                            <Svg icon="trash" className="text-white" />
                        </span>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-lg w-full py-3 px-12">
                    {resource.fields.map((field, index) => (
                        <div key={index} className={classnames('w-full py-4 flex items-center', {
                            'border-b border-grey-light ': index !== resource.fields.length - 1
                        })}>
                            <label className='w-1/4 text-lg font-thin text-grey-dark'>
                                {field.name}
                            </label>

                            <div className='w-2/4 flex flex-col'>
                                {data[field.attribute]}
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    open={deleting}
                    action={{
                        type: 'danger',
                        label: 'Delete',
                        handler: this.delete
                    }}
                    renderContent={() => (
                        <p className="text-grey-dark">
                            Are you sure you want to delete this resource?
                        </p>
                    )}
                    title="Delete Resource"
                    cancel={this.triggerDelete}
                />
            </React.Fragment>
        )
    }
}

export default ResourceDetails
