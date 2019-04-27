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
    triggerDelete = () =>
        this.setState({
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

                Pangaso.success(`${resource.name} deleted !`)
            })
    }

    /**
     *
     * Get detail field
     *
     * @return {React.Component}
     *
     */
    getDetailField = detail => Pangaso.details[detail]

    /**
     *
     * Get the fields to be displayed on details page
     *
     * @return {array}
     *
     */
    getDetailFields = () =>
        this.state.resource.fields.filter(field => !field.hideOnDetailPage)

    /**
     *
     * Get the embedded fields
     *
     * @return {array}
     *
     */
    getEmbeddedFields = () =>
        this.state.resource.fields.filter(field =>
            ['HasOneEmbedded', 'HasManyEmbedded'].includes(field.type)
        )

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
        const Button = Pangaso.components['component-button']

        const fields = this.getDetailFields()
        const embeddedFields = this.getEmbeddedFields()

        return (
            <React.Fragment>
                <div className="flex justify-between items-center">
                    <h1 className="font-thin text-3xl mb-2">
                        {resource.name} Details
                    </h1>

                    <div className="flex">
                        <Button
                            link
                            label={'Edit'}
                            className="mr-1"
                            to={`/resources/${resource.slug}/${
                                data[resource.primaryKey]
                            }/edit`}
                        />
                        <Button
                            handler={this.triggerDelete}
                            label={'Delete'}
                            type="danger"
                        />
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-lg w-full py-4 px-8">
                    {fields.map((field, index) => {
                        const DetailField = this.getDetailField(field.detail)

                        return DetailField ? (
                            <div
                                key={index}
                                className={classnames(
                                    'w-full py-4 flex items-center',
                                    {
                                        'border-b border-grey-light ':
                                            index !== fields.length - 1
                                    }
                                )}
                            >
                                <label className="w-1/4 text-lg font-thin text-grey-dark">
                                    {field.name}
                                </label>

                                <div className="w-2/4 flex flex-col text-grey-darkest leading-normal tracking-normal">
                                    <DetailField
                                        dateFormat={field.dateFormat}
                                        checked={data[field.attribute]}
                                        content={data[field.attribute]}
                                    />
                                </div>
                            </div>
                        ) : null
                    })}
                </div>

                {embeddedFields.map((embeddableField, index) => (
                    <div key={index} className="w-full mt-12">
                        <h3 className="font-thin text-2xl mb-2">
                            {embeddableField.name}
                        </h3>

                        <div className="mt-6 bg-white rounded-lg w-full py-4 px-8">
                            {embeddableField.fields.map((field, index) => {
                                const embeddableFieldData =
                                    data[embeddableField.attribute] || {}

                                const DetailField = this.getDetailField(
                                    field.detail
                                )

                                return DetailField ? (
                                    <div
                                        key={index}
                                        className={classnames(
                                            'w-full py-4 flex items-center',
                                            {
                                                'border-b border-grey-light ':
                                                    index !== embeddableField.fields.length - 1
                                            }
                                        )}
                                    >
                                        <label className="w-1/4 text-lg font-thin text-grey-dark">
                                            {field.name}
                                        </label>

                                        <div className="w-2/4 flex flex-col text-grey-darkest leading-normal tracking-normal">
                                            <DetailField
                                                dateFormat={field.dateFormat}
                                                checked={
                                                    embeddableFieldData[
                                                        field.attribute
                                                    ]
                                                }
                                                content={
                                                    embeddableFieldData[
                                                        field.attribute
                                                    ]
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : null
                            })}
                        </div>
                    </div>
                ))}
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
