import React from 'react'
import classnames from 'classnames'

const Select = ({
    handler,
    value,
    name,
    error,
    className,
    placeholder = 'Select an option',
    options = []
}) => (
    <React.Fragment>
        <select
            name={name}
            value={value}
            onChange={handler}
            className={classnames(
                'bg-white focus:outline-none text-grey-darkest my-3 border h-10 px-3 rounded-lg shadow focus:outline-none focus:border-2',
                {
                    'border-grey focus:border-indigo': !error,
                    'border-red focus:border-red': error
                },
                className
            )}
        >
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <span className="text-xs text-red font-thin">{error}</span>}
    </React.Fragment>
)

export default Select
