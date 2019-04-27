import React from 'react'

const Select = ({ content, options = [] }) => {
    const option = options.find(o => o.value === content)

    return <div>{option && option.label}</div>
}

export default Select
