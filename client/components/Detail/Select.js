import React from 'react'

const Select = ({ content, dataTestId, options = [] }) => {
    const option = options.find(o => o.value === content)

    return (
        <div data-testid={dataTestId} className="font-light text-gray-700">
            {option && option.label}
        </div>
    )
}

export default Select
