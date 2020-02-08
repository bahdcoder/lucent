import React from 'react'

class HasOneField extends React.Component {
    state = {
        options: [],
        resource: this.getResource()
    }

    /**
     *
     * Fetch a list of all the selectable values
     *
     */
    componentDidMount() {
        const { field } = this.props
        const { resource } = this.state

        !field.isSearchable &&
        Lucent.request()
                .get(`/resources/${resource.slug}/all`)
                .then(({ data }) => {
                    this.setState({
                        options: data
                    })
                })
    }

    /**
     *
     * Get the related resource
     *
     * @return {object}
     *
     */
    getResource() {
        return Lucent.resources.find(
            resource => resource.name === this.props.field.resource
        )
    }

    /**
     *
     * Get select options
     *
     */
    getSelectOptions = () => {
        const { resource } = this.state

        return this.state.options.map(option => ({
            label: option[resource.displayValue],
            value: option[resource.primaryKey]
        }))
    }

    /**
     *
     * Render the has one field
     *
     */
    render() {
        const Select = Lucent.components['component-select']
        const Combobox = Lucent.components['component-combobox']

        if (this.props.field.isSearchable) {
            const { resource } = this.state

            return <Combobox {...this.props} resource={resource} />
        } else {
            const { field, handler, value, ...rest } = this.props

            return (
                <Select
                    value={value}
                    handler={handler}
                    name={field.attribute}
                    options={this.getSelectOptions()}
                    placeholder={`Select a ${field.name}`}
                />
            )
        }
    }
}

export default HasOneField
