import React from 'react'

class HasManyField extends React.Component {
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
        Pangaso.request()
            .get(`/resources/${this.state.resource.slug}/all`)
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
        return Pangaso.resources.find(
            resource => resource.title === this.props.field.resource
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
        const { field, handler, value } = this.props

        const MultiSelect = Pangaso.components['component-multiselect']

        return (
            <MultiSelect
                value={value}
                handler={handler}
                name={field.attribute}
                options={this.getSelectOptions()}
            />
        )
    }
}

export default HasManyField
