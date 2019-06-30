import React from 'react'
import classnames from 'classnames'
import format from 'date-fns/format'
import HasManyEmbedded from '../components/HasManyEmbedded'

class AddResource extends React.Component {
    state = {
        form: {},
        errors: {},
        record: {},
        staleFiles: [],
        preparedForm: {},
        resource: this.getCurrentResource(),
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
    populateFields = (data = {}) => {
        const form = {}
        const errors = {}

        this.getCreationFields().forEach(field => {
            if (field.type === 'Date') {
                form[field.attribute] = format(
                    data[field.attribute] || new Date(),
                    this.getFormat(field)
                )
                errors[field.attribute] = null

                return
            }

            if (field.type === 'HasManyEmbedded') {
                form[field.attribute] = data[field.attribute] || [{}]

                errors[field.attribute] = [{}]

                return
            }

            if (field.type === 'Boolean') {
                form[field.attribute] = !!data[field.attribute] || false
                errors[field.attribute] = null

                return
            }

            if (field.type === 'HasOneEmbedded') {
                errors[field.attribute] = {}
            }

            form[field.attribute] =
                data[field.attribute] || this.getDefaultFieldValue(field)
        })

        this.setState({
            form,
            errors,
            preparedForm: form
        })
    }

    /**
     *
     * Get the default for a field
     *
     * @param {object} field
     *
     * @return {}
     *
     */
    getDefaultFieldValue(field) {
        if (field.type === 'HasOneEmbedded') {
            let attributes = {}

            field.fields.forEach(field => {
                attributes[field.attribute] = this.getDefaultFieldValue(field)
            })

            return attributes
        }

        if (field.type === 'HasMany') {
            return []
        }

        if (field.type === 'Date') {
            return new Date()
        }

        if (field.type === 'Boolean') {
            return false
        }

        return ''
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
     * Fetch the resource to be edited
     *
     */
    fetchEditingResource() {
        Pangaso.request()
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
            .then(({ data }) => {
                this.setState(
                    {
                        record: data
                    },
                    () => this.populateFields(data)
                )
            })

            /**
             *
             * If there are any errors fetching fields, simply
             * redirectback to this resource page
             *
             */
            .catch(() => {
                Pangaso.error('Failed fetching resource.')

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
    postResource = async (redirect = true) => {
        Pangaso.request()
            .post(
                `resources/${this.state.resource.slug}`,
                await this.getFormData()
            )
            .then(() => {
                Pangaso.success(`${this.state.resource.name} created !`)

                if (redirect) {
                    return this.props.history.push(
                        `/resources/${this.state.resource.slug}`
                    )
                }

                this.populateFields()
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    this.setState({
                        errors: response.data
                    })
                }
            })
    }

    /**
     * Get a string of all has many embedded fields
     *
     * @return {Array}
     */
    getHasManyEmbeddedFields = () =>
        this.state.resource.fields
            .filter(field => field.type === 'HasManyEmbedded')
            .map(field => field.attribute)

    /**
     *
     * Get the form data from state
     * to be sent to the server
     *
     */
    getFormData = async () => {
        const { form, resource } = this.state

        const preparedForm = {}
        const staleFiles = []

        for (const attribute of Object.keys(form)) {
            const field = form[attribute]

            if (
                field &&
                typeof field === 'object' &&
                !(field instanceof Blob) &&
                !Array.isArray(field)
            ) {
                preparedForm[attribute] = {}

                for (const nestedAttribute of Object.keys(field)) {
                    const nestedField = field[nestedAttribute]

                    if (nestedField instanceof Blob) {
                        if (
                            this.state.preparedForm[attribute][nestedAttribute]
                        ) {
                            staleFiles.push(
                                this.state.preparedForm[attribute][
                                    nestedAttribute
                                ]
                            )
                        }

                        const path = await this.uploadFile(
                            nestedAttribute,
                            nestedField
                        )

                        preparedForm[attribute][nestedAttribute] = path
                    } else {
                        preparedForm[attribute][nestedAttribute] = nestedField
                    }
                }
            } else if (field instanceof Blob) {
                if (this.state.preparedForm[attribute]) {
                    staleFiles.push(this.state.preparedForm[attribute])
                }

                const path = await this.uploadFile(attribute, field)

                preparedForm[attribute] = path
            } else if (field instanceof Date) {
                const { dateFormat } = resource.fields.find(f => f.attribute === attribute)

                preparedForm[attribute] = format(field, dateFormat)
            } else {
                preparedForm[attribute] = field
            }
        }

        this.setState({
            preparedForm,
            staleFiles
        })

        return {
            ...preparedForm,
            staleFiles
        }
    }

    uploadFile = async (attribute, file) => {
        const form = new FormData()

        form.append('file', file)

        const { data } = await Pangaso.request().post(
            `/resources/${this.state.resource.slug}/upload-file`,
            form
        )

        return data
    }

    /**
     *
     * Patch request to server to update resource
     *
     * @return {void}
     *
     */
    updateResource = async (redirect = true) => {
        Pangaso.request()
            .put(
                `resources/${this.state.resource.slug}/${
                    this.props.match.params.primaryKey
                }`,
                await this.getFormData()
            )
            .then(() => {
                Pangaso.success(`${this.state.resource.name} updated !`)

                if (redirect) {
                    return this.props.history.push(
                        `/resources/${this.state.resource.slug}/${
                            this.props.match.params.primaryKey
                        }/details`
                    )
                }
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    this.setState({
                        errors: response.data
                    })
                }
            })
    }

    /**
     *
     * Handle field change for any of the fields available.
     *
     * @param {React.SyntheticEvent} event
     *
     * @param {strng} string
     *
     * @return {void}
     *
     */
    handleChange = (event, embedded = null, hasMany = false) => {
        if (['MultiSelect', 'SingleSelect'].includes(event.type)) {
            return this.setState({
                form: {
                    ...this.state.form,
                    [embedded ? embedded : event.name]: embedded
                        ? {
                              ...this.state.form[embedded],
                              [event.name]: event.value
                          }
                        : event.value
                }
            })
        }

        if (hasMany) {
            return this.setState({
                form: {
                    ...this.state.form,
                    [event.attribute]: this.state.form[event.attribute].map(
                        (item, itemIndex) => {
                            if (itemIndex === event.index) {
                                return {
                                    ...item,
                                    [event.name]: event.value
                                }
                            }

                            return item
                        }
                    )
                },
                errors: {
                    ...this.state.errors,
                    [event.attribute]: this.state.errors[event.attribute]
                        ? this.state.errors[event.attribute].map(item => ({
                              ...item,
                              [event.name]: null
                          }))
                        : []
                }
            })
        }

        /**
         *
         * Handle the date field case
         *
         */
        if (event.name && event.date) {
            return this.setState({
                form: {
                    ...this.state.form,
                    [embedded ? embedded : event.name]: embedded
                        ? {
                              ...this.state.form[embedded],
                              [event.name]: event.date
                          }
                        : event.date
                },
                errors: {
                    ...this.state.errors,
                    [embedded ? embedded : event.name]: embedded
                        ? {
                              ...this.state.errors[embedded],
                              [event.name]: null
                          }
                        : null
                }
            })
        }

        if (event.target.type === 'checkbox') {
            return this.setState({
                form: {
                    ...this.state.form,
                    [embedded ? embedded : event.target.name]: embedded
                        ? {
                              ...this.state.form[embedded],
                              [event.target.name]: !this.state.form[embedded][
                                  event.target.name
                              ]
                          }
                        : !this.state.form[event.target.name]
                }
            })
        }

        if (event.target.files) {
            return this.setState({
                form: {
                    ...this.state.form,
                    [embedded ? embedded : event.target.name]: embedded
                        ? {
                              ...this.state.form[embedded],
                              [event.target.name]: event.target.files[0]
                          }
                        : event.target.files[0]
                },
                errors: {
                    ...this.state.errors,
                    [embedded ? embedded : event.target.name]: embedded
                        ? {
                              ...this.state.errors[embedded],
                              [event.target.name]: null
                          }
                        : null
                }
            })
        }

        this.setState({
            form: {
                ...this.state.form,
                [embedded ? embedded : event.target.name]: embedded
                    ? {
                          ...this.state.form[embedded],
                          [event.target.name]: event.target.value
                      }
                    : event.target.value
            },
            errors: {
                ...this.state.errors,
                [embedded ? embedded : event.target.name]: embedded
                    ? {
                          ...this.state.errors[embedded],
                          [event.target.name]: null
                      }
                    : null
            }
        })
    }

    /**
     * Remove item from has many embedded field list
     *
     * @return {null}
     */
    removeItem = (attribute, indexToRemove) => {
        this.setState({
            form: {
                ...this.state.form,
                [attribute]: this.state.form[attribute].filter(
                    (item, index) => index !== indexToRemove
                )
            }
        })
    }

    /**
     * Add a new item to list
     */
    addNewItem = attribute => {
        this.setState({
            form: {
                ...this.state.form,
                [attribute]: [...this.state.form[attribute], {}]
            }
        })
    }

    /**
     *
     * Get the embedded fields
     *
     * @return {array}
     *
     */
    getEmbeddedFields = () =>
        this.state.resource.fields
            .filter(field =>
                ['HasOneEmbedded', 'HasManyEmbedded'].includes(field.type)
            )
            .sort(field => field.type === 'HasOneEmbedded')

    /**
     *
     * Get date format
     *
     * @param {Object} field
     *
     * @return {string}
     *
     */
    getFormat = field => `YYYY-MM-DD${field.enableTime ? ' mm:ss' : ''}`

    /**
     *
     * Get the fields shown for creation
     *
     * @return {array}
     *
     */
    getCreationFields = () =>
        this.state.resource.nonComputedFields.filter(
            field => !field.hideOnCreationForm
        )

    /**
     *
     * Get the fields shown for update
     *
     * @return {array}
     *
     */
    getUpdateFields = () =>
        this.state.resource.nonComputedFields.filter(
            field => !field.hideOnUpdateForm
        )

    /**
     *
     * Get a field from the component registry
     */
    getField = component => Pangaso.fields[component]

    /**
     *
     * Render add resource
     *
     */
    render() {
        const Button = Pangaso.components['component-button']
        const Loader = Pangaso.components['component-loader']
        const { editing, errors, form, resource, record } = this.state

        const embeddableFields = this.getEmbeddedFields()
        const formFields = editing
            ? this.getUpdateFields()
            : this.getCreationFields()

        // Only render the form once the form has been populated
        return (
            <React.Fragment>
                {Object.keys(form).length === 0 ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <h1 className="font-thin text-3xl mb-2">
                            {`${editing ? 'Edit' : 'New'}`} {resource.name}
                        </h1>

                        <div className="w-full mt-6 bg-white rounded-lg">
                            {formFields.map((field, index) => {
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
                                                field={field}
                                                editing={editing}
                                                className="w-full"
                                                resource={resource}
                                                id={field.attribute}
                                                name={field.attribute}
                                                value={form[field.attribute]}
                                                checked={form[field.attribute]}
                                                dateOptions={{
                                                    enableTime: field.enableTime
                                                }}
                                                dataTestId={`field-${
                                                    field.attribute
                                                }`}
                                                options={field.options}
                                                error={errors[field.attribute]}
                                                placeholder={
                                                    field.type === 'Select'
                                                        ? `Select a ${
                                                              field.name
                                                          }`
                                                        : field.name
                                                }
                                                handler={(...all) =>
                                                    this.handleChange(
                                                        all[0],
                                                        all[1]
                                                    )
                                                }
                                                parentRecord={record}
                                                parentResource={resource}
                                            />
                                        </div>
                                    </div>
                                ) : null
                            })}
                        </div>

                        {embeddableFields.map((embeddableField, index) => {
                            if (embeddableField.type === 'HasOneEmbedded') {
                                const formFields = embeddableField.fields

                                return (
                                    <div key={index} className="mt-8">
                                        <h3 className="font-thin text-2xl">
                                            {embeddableField.name}
                                        </h3>

                                        <div className="w-full mt-6 bg-white rounded-lg">
                                            {formFields.map((field, index) => {
                                                const Field = this.getField(
                                                    field.component
                                                )

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
                                                                {...field}
                                                                className="w-full"
                                                                id={
                                                                    field.attribute
                                                                }
                                                                name={
                                                                    field.attribute
                                                                }
                                                                placeholder={
                                                                    field.name
                                                                }
                                                                handler={e =>
                                                                    this.handleChange(
                                                                        e,
                                                                        embeddableField.attribute
                                                                    )
                                                                }
                                                                dataTestId={`field-${
                                                                    embeddableField.attribute
                                                                }-${
                                                                    field.attribute
                                                                }`}
                                                                value={
                                                                    form[
                                                                        embeddableField
                                                                            .attribute
                                                                    ] &&
                                                                    form[
                                                                        embeddableField
                                                                            .attribute
                                                                    ][
                                                                        field
                                                                            .attribute
                                                                    ]
                                                                }
                                                                checked={
                                                                    form[
                                                                        embeddableField
                                                                            .attribute
                                                                    ] &&
                                                                    form[
                                                                        embeddableField
                                                                            .attribute
                                                                    ][
                                                                        field
                                                                            .attribute
                                                                    ]
                                                                }
                                                                dateOptions={{
                                                                    enableTime:
                                                                        field.enableTime
                                                                }}
                                                                error={
                                                                    errors[
                                                                        embeddableField
                                                                            .attribute
                                                                    ] &&
                                                                    errors[
                                                                        embeddableField
                                                                            .attribute
                                                                    ][
                                                                        field
                                                                            .attribute
                                                                    ]
                                                                }
                                                                options={
                                                                    field.options
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ) : null
                                            })}
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <HasManyEmbedded
                                    key={index}
                                    editing={editing}
                                    {...embeddableField}
                                    handleChange={this.handleChange}
                                    value={form[embeddableField.attribute]}
                                    errors={errors[embeddableField.attribute]}
                                    addNewItem={() =>
                                        this.addNewItem(
                                            embeddableField.attribute
                                        )
                                    }
                                    removeItem={indexToRemove =>
                                        this.removeItem(
                                            embeddableField.attribute,
                                            indexToRemove
                                        )
                                    }
                                />
                            )
                        })}

                        <div
                            className={classnames(
                                'p-8 flex justify-end bg-grey-lighter shadow'
                            )}
                        >
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
                                dataTestId={`create-resource-button-and-add-another-${
                                    resource.slug
                                }`}
                            />
                            <Button
                                className="mr-6"
                                handler={
                                    editing
                                        ? this.updateResource
                                        : this.postResource
                                }
                                label={`${editing ? 'Update' : 'Create'} ${
                                    resource.name
                                }`}
                                dataTestId={`create-resource-button-${
                                    resource.slug
                                }`}
                            />
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default AddResource
