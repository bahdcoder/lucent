import React from 'react'

class HasManyField extends React.Component {
    state = {
        resource: this.getCurrentResource()
    }

    componentDidMount() {
        const { editing } = this.props

        if (editing) {
            Pangaso
        }
    }

    /**
     *
     * Get the current resource, which is the
     * related resource
     *
     */
    getCurrentResource() {
        return Pangaso.resources.find(
            resource => resource.title === this.props.field.resource
        )
    }

    /**
     *
     * Render the has one field
     *
     */
    render() {
        const { value, resource, ...rest } = this.props
        const Combobox = Pangaso.components['component-combobox']

        return (
            <React.Fragment>
                <Combobox multiple resource={this.state.resource} {...rest} />
            </React.Fragment>
        )
    }
}

export default HasManyField
