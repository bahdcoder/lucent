import * as React from 'react'
import * as format from 'date-fns/format'
import { AxiosError, AxiosResponse } from 'axios'

interface AddResourceStateInterface {
    resource: any
    form: any
    errors: any
    editing: boolean
}

interface AddResourcePropsInterface {
    match: {
        params: {
            resource: string
            primaryKey: string
        }
    }
    history: {
        push(path: string): void
    }
}

class AddResource extends React.Component<
    AddResourcePropsInterface,
    AddResourceStateInterface
> {
    state: AddResourceStateInterface = {
        resource: this.getCurrentResource(),
        form: {},
        errors: {},
        editing: !!this.props.match.params.primaryKey
    }

    /**
     *
     * Set default values
     *
     * @return {void}
     *
     */
    componentDidMount() {
        if (this.state.editing) {
            return this.fetchEditingResource()
        }

        this.populateFields()
    }

    /**
     *
     * Populate fields
     *
     * @param {object} data
     *
     * @return {void}
     *
     */
    private populateFields = (data: any = {}) => {
        const form: any = {}

        this.getCreationFields().forEach((field: any) => {
            form[field.attribute] =
                field.type === 'Date'
                    ? format(
                          data[field.attribute] || new Date(),
                          this.getFormat(field)
                      )
                    : data[field.attribute] || ''
        })

        this.setState({
            form
        })
    }

    /**
     *
     * Get the current resource based on resource param
     *
     */
    private getCurrentResource(
        slug: string = this.props.match.params.resource
    ) {
        return (window as any).Pangaso.resources.find(
            (resource: any) => resource.slug === slug
        )
    }

    /**
     *
     * Fetch the resource to be edited
     *
     */
    private fetchEditingResource() {
        ;(window as any).Pangaso.request()
            .get(
                `/resources/${this.state.resource.slug}/${
                    this.props.match.params.primaryKey
                }`
            )

            /**
             *
             * Populate fields when resource is fetched from api
             *
             */
            .then(({ data }: AxiosResponse) => {
                this.populateFields(data)
            })

            /**
             *
             * If there are any errors fetching fields, simply
             * redirectback to this resource page
             *
             */
            .catch(() => {
                ;(window as any).Pangaso.error('Failed fetching resource.')

                this.props.history.push(
                    `/resources/${this.state.resource.slug}`
                )
            })
    }

    /**
     *
     * Post request to server to save resource
     *
     * @return {void}
     *
     */
    private postResource = (redirect: boolean = true) => {
        ;(window as any).Pangaso.request()
            .post(`resources/${this.state.resource.slug}`, this.state.form)
            .then(() => {
                ;(window as any).Pangaso.success(
                    `${this.state.resource.name} created !`
                )

                redirect &&
                    this.props.history.push(
                        `/resources/${this.state.resource.slug}`
                    )
            })
            .catch(({ response }: AxiosError) => {
                if (response.status === 422) {
                    this.setState({
                        errors: response.data
                    })
                }
            })
    }

    /**
     *
     * Patch request to server to update resource
     *
     * @return {void}
     *
     */
    private updateResource = (redirect: boolean = true) => {
        ;(window as any).Pangaso.request()
            .put(
                `resources/${this.state.resource.slug}/${
                    this.props.match.params.primaryKey
                }`,
                this.state.form
            )
            .then(() => {
                ;(window as any).Pangaso.success(
                    `${this.state.resource.name} updated !`
                )

                redirect &&
                    this.props.history.push(
                        `/resources/${this.state.resource.slug}`
                    )
            })
            .catch(({ response }: AxiosError) => {
                if (response.status === 422) {
                    this.setState({
                        errors: response.data
                    })
                }
            })
    }

    /**
     *
     * @return {void}
     *
     */
    handleChange = (event: any) => {
        /**
         *
         * Handle the date field case
         *
         */
        if (event.name && event.date) {
            return this.setState({
                form: {
                    ...this.state.form,
                    [event.name]: event.date
                },
                errors: {
                    ...this.state.errors,
                    [event.name]: null
                }
            })
        }

        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            },
            errors: {
                ...this.state.errors,
                [event.target.name]: null
            }
        })
    }

    /**
     *
     * Get date format
     *
     * @param {Object} field
     *
     * @return {string}
     *
     */
    private getFormat = (field: any): string =>
        `YYYY-MM-DD${field.enableTime ? ' mm:ss' : ''}`

    /**
     *
     * Get the fields shown for creation
     *
     * @return {array}
     *
     */
    private getCreationFields = (): Array<any> =>
        this.state.resource.fields.filter(
            (field: any) => !field.hideOnCreationForm
        )

    /**
     *
     * Get the fields shown for update
     *
     * @return {array}
     *
     */
    privateGetUpdateFields = (): Array<any> =>
        this.state.resource.fields.filder(
            (field: any) => !field.hideOnUpdateForm
        )

    /**
     *
     * Get a field from the component registry
     */
    private getField = (component: string) =>
        (window as any).Pangaso.fields[component]

    /**
     *
     * Render add resource
     *
     */
    render() {
        const { editing, errors, form, resource } = this.state
        const Button = (window as any).Pangaso.components['component-button']

        return (
            <React.Fragment>
                <h1 className="font-thin text-3xl mb-2">
                    {`${editing ? 'Edit' : 'New'}`} {resource.name}
                </h1>

                <div className="w-full mt-6 bg-white rounded-lg">
                    {this.getCreationFields().map(
                        (field: any, index: number) => {
                            const Field = this.getField(field.component)

                            return Field ? (
                                <div
                                    key={index}
                                    className="w-full border-b flex items-center border-grey-light py-6 px-12"
                                >
                                    <label className="w-1/4 text-lg font-thin text-grey-dark">
                                        {field.name}
                                    </label>

                                    <div className="w-2/4 flex flex-col">
                                        <Field
                                            className="w-full"
                                            name={field.attribute}
                                            placeholder={field.name}
                                            handler={this.handleChange}
                                            value={form[field.attribute]}
                                            dateOptions={{
                                                enableTime: field.enableTime
                                            }}
                                            error={errors[field.attribute]}
                                        />
                                    </div>
                                </div>
                            ) : null
                        }
                    )}
                </div>

                <div className="p-8 flex justify-end bg-grey-lighter shadow">
                    <Button
                        handler={
                            editing
                                ? () => this.updateResource(false)
                                : () => this.postResource(false)
                        }
                        label={
                            editing
                                ? 'Updated & Continue editing'
                                : 'Create & Add another'
                        }
                        className="mr-6"
                    />
                    <Button
                        className="mr-6"
                        handler={
                            editing ? this.updateResource : this.postResource
                        }
                        label={`${editing ? 'Update' : 'Create'} ${
                            resource.name
                        }`}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default AddResource
