import React from 'react'
import classnames from 'classnames'

import HasOne from '../components/HasOne'
import HasMany from '../components/HasMany'

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
        this.fetch(this.props.match.params.primaryKey)
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
                () => this.fetch(nextProps.match.params.primaryKey)
            )
        }
    }

    fetch(primaryKey, push = true) {
        Lucent.request()
            .get(`/resources/${this.state.resource.slug}/${primaryKey}`)
            .then(({ data }) => {
                this.setState(
                    {
                        data
                    },
                    () => {
                        if (push) {
                            this.props.history.push(
                                `/resources/${
                                    this.state.resource.slug
                                }/${primaryKey}/details`
                            )
                        }
                    }
                )
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
        return Lucent.resources.find(resource => resource.slug === slug)
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
        Lucent.request()
            .delete(`/resources/${resource.slug}`, {
                data: {
                    resources: [data[resource.primaryKey]]
                }
            })
            .then(() => {
                this.props.history.push(`/resources/${resource.slug}`)

                Lucent.success(`${resource.name} deleted !`)
            })
    }

    /**
     *
     * Get detail field
     *
     * @return {React.Component}
     *
     */
    getDetailField = detail => Lucent.details[detail]

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
     * Get all HasOne relationships
     *
     * @return {array}
     *
     */
    getHasOneFields = () =>
        this.state.resource.fields.filter(field => field.type === 'HasOne')

    /**
     *
     * Get all HasMany relationships
     *
     * @return {array}
     *
     */
    getHasManyFields = () =>
        this.state.resource.fields.filter(field => field.type === 'HasMany')

    /**
     *
     * This method navigates to another detail
     *
     */
    viewChildResource = (resource, primaryKey) => {
        this.setState(
            {
                data: {},
                resource,
                deleting: false
            },
            () => this.fetch(primaryKey, true)
        )
    }

    renderDetailField = (
        embeddableField,
        field,
        embeddableFieldData,
        index
    ) => {
        const DetailField = this.getDetailField(field.detail)

        return DetailField ? (
            <div
                key={index}
                className={classnames('w-full py-4 flex items-center', {
                    'border-b border-grey-light ':
                        index !== embeddableField.fields.length - 1
                })}
            >
                <label className="w-1/4 text-lg font-thin text-grey-dark">
                    {field.name}
                </label>

                <div className="w-2/4 flex flex-col text-grey-darkest leading-normal tracking-normal">
                    <DetailField
                        dateFormat={field.dateFormat}
                        checked={embeddableFieldData[field.attribute]}
                        content={embeddableFieldData[field.attribute]}
                        options={field.options}
                        dataTestId={`detail-${embeddableField.attribute}-${
                            field.attribute
                        }`}
                    />
                </div>
            </div>
        ) : null
    }

    /**
     *
     * Render the JSX for component
     *
     * @return {JSX}
     *
     */
    render() {
        const { Link } = this.props
        const { resource, data, deleting } = this.state

        const Modal = Lucent.components['component-modal']
        const Button = Lucent.components['component-button']

        const fields = this.getDetailFields()
        const hasOneFields = this.getHasOneFields()
        const hasManyFields = this.getHasManyFields()
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
                            dataTestId={`edit-resource-button-${resource.slug}`}
                        />
                        <Button
                            type="danger"
                            label={'Delete'}
                            handler={this.triggerDelete}
                            dataTestId={`delete-resource-button-${
                                resource.slug
                            }`}
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
                                        options={field.options}
                                        dateFormat={field.dateFormat}
                                        checked={data[field.attribute]}
                                        content={data[field.attribute]}
                                        dataTestId={`detail-${field.attribute}`}
                                        {...field}
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
                        {embeddableField.type === 'HasManyEmbedded' &&
                            (data[embeddableField.attribute] || []).map(
                                (fieldData, fieldDataIndex) => (
                                    <div
                                        key={fieldDataIndex}
                                        className="mt-6 bg-white rounded-lg w-full py-4 px-8"
                                    >
                                        {embeddableField.fields.map(
                                            (field, fieldIndex) =>
                                                this.renderDetailField(
                                                    embeddableField,
                                                    field,
                                                    fieldData || {},
                                                    fieldIndex
                                                )
                                        )}
                                    </div>
                                )
                            )}
                        {embeddableField.type === 'HasOneEmbedded' && (
                            <div className="mt-6 bg-white rounded-lg w-full py-4 px-8">
                                {embeddableField.fields.map((field, index) =>
                                    this.renderDetailField(
                                        embeddableField,
                                        field,
                                        data[embeddableField.attribute] || {},
                                        index
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {Object.keys(data).length > 0 &&
                    hasOneFields.map((hasOneField, index) => (
                        <HasOne
                            key={index}
                            parentRecord={data}
                            field={hasOneField}
                            parentResource={resource}
                            viewChildResource={this.viewChildResource}
                        />
                    ))}

                {Object.keys(data).length > 0 &&
                    hasManyFields.map((hasManyField, index) => (
                        <HasMany
                            key={index}
                            Link={Link}
                            {...this.props}
                            parentRecord={data}
                            field={hasManyField}
                            parentResource={resource}
                            viewChildResource={this.viewChildResource}
                        />
                    ))}
                <Modal
                    open={deleting}
                    action={{
                        type: 'danger',
                        label: 'Delete',
                        handler: this.delete,
                        dataTestId: `confirm-delete-resource-button-${
                            resource.slug
                        }`
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
