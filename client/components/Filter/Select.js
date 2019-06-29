import React from 'react'
import Select from '../Select'

const SelectFilter = ({ handler, name, ...rest }) => (
    <Select
        {...rest}
        placeholder="--------"
        handler={event => handler({ name, value: event.target.value })}
    />
)

export default SelectFilter
