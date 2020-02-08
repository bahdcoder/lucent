import React from 'react'
import Resource from '../pages/Resource'

/**
 *
 * Get the current resource based on resource param
 *
 */
const HasMany = props => {
    const getCurrentResource = () =>
    Lucent.resources.find(
            resource => resource.title === props.field.resource
        )

    return (
        <div className="mt-12">
            <Resource {...props} resource={getCurrentResource()} />
        </div>
    )
}

export default HasMany
