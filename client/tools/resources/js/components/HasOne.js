import React from 'react'
import classnames from 'classnames'

class HasOne extends React.Component {
    state = {
        data: {},
        isFetching: true,
        resource: this.getCurrentResource()
    }

    /**
     *
     * Once the component mounts, find the related record
     *
     */
    componentDidMount() {
        const { field, parentResource, parentRecord } = this.props

        Lucent.request()
            .get(
                `/resources/${parentResource.slug}/${
                    parentRecord[parentResource.primaryKey]
                }/has-one/${field.attribute}`
            )
            .then(({ data }) => {
                this.setState({
                    data,
                    isFetching: false
                })
            })
    }

    /**
     *
     * Get the current resource based on resource param
     *
     */
    getCurrentResource() {
        return Lucent.resources.find(
            resource => resource.name === this.props.field.resource
        )
    }

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
     * Render the component
     *
     */
    render() {
        const { field, viewChildResource } = this.props
        const { isFetching, resource, data } = this.state

        const resourceFields = this.getDetailFields()

        const Loader = Lucent.components['component-loader']
        const Button = Lucent.components['component-button']

        const resourceWasFound = data && Object.keys(data).length > 0

        return (
            <React.Fragment>
                {isFetching ? (
                    <Loader />
                ) : (
                    <div className="w-full mt-12">
                        <div className="flex justify-between items-center">
                            <h3 className="font-thin text-2xl mb-2">
                                {field.name}
                            </h3>

                            {resourceWasFound && (
                                <div className="flex">
                                    <Button
                                        label={'View'}
                                        className="mr-1"
                                        handler={() =>
                                            viewChildResource(
                                                resource,
                                                data[resource.primaryKey]
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-6 bg-white rounded-lg w-full py-4 px-8">
                            {resourceWasFound &&
                                resourceFields.map((field, index) => {
                                    const DetailField =
                                    Lucent.details[field.detail]

                                    return DetailField ? (
                                        <div
                                            key={index}
                                            className={classnames(
                                                'w-full py-4 flex items-center',
                                                {
                                                    'border-b border-grey-light ':
                                                        index !==
                                                        resourceFields.length -
                                                            1
                                                }
                                            )}
                                        >
                                            <label className="w-1/4 text-lg font-thin text-grey-dark">
                                                {field.name}
                                            </label>

                                            <div className="w-2/4 flex flex-col text-grey-darkest leading-normal tracking-normal">
                                                <DetailField
                                                    dateFormat={
                                                        field.dateFormat
                                                    }
                                                    checked={
                                                        data[field.attribute]
                                                    }
                                                    content={
                                                        data[field.attribute]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                })}
                            {!resourceWasFound && !isFetching && (
                                <span className="w-full font-bold flex items-center justify-center py-8 text-indigo">
                                    Resource not found.
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default HasOne
