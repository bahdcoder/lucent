import React from 'react'

const Select = ({ content, dataTestId, options = [] }) => {
    const option = options.find(o => o.value === content)

    return <div data-testid={dataTestId}>{option && option.label}</div>
}

export default Select
