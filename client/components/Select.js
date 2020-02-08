import React from 'react'
import classnames from 'classnames'

const Select = ({
    handler,
    value,
    name,
    error,
    className,
    dataTestId,
    options = [],
    multiple = false,
    isCombobox = false,
    placeholder = 'Select an option'
}) => (
    <React.Fragment>
        <select
            name={name}
            value={value}
            onChange={handler}
            data-testid={dataTestId}
            className={classnames(
                'bg-white focus:outline-none text-gray-700 my-3 border h-10 px-3 rounded-sm focus:outline-none',
                {
                    'border-gray-300 focus:border-gray-400': !error,
                    'border-red-600 focus:border-red-600': error
                },
                className
            )}
            multiple={multiple}
        >
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && (
            <span
                data-testid={`${dataTestId}-error`}
                className="text-xs text-red-600 font-light"
            >
                {error}
            </span>
        )}
    </React.Fragment>
)

export default Select
