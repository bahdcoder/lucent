import React from 'react'
import classnames from 'classnames'

const Text = ({
    className = '',
    name = '',
    placeholder = '',
    value = '',
    type = 'text',
    error,
    rows,
    cols,
    dataTestId,
    textarea = false,
    handler = () => {}
}) => {
    const Component = textarea ? 'textarea' : 'input'

    return (
        <React.Fragment>
            <Component
                className={classnames(
                    'border text-gray-600 my-3 px-5 rounded focus:outline-none',
                    {
                        'h-10': !textarea,
                        'border-gray-300 focus:border-gray-400': !error,
                        'border-red-500 focus:border-red-500': error
                    },
                    className
                )}
                rows={rows}
                cols={cols}
                name={name}
                type={type}
                value={value}
                onChange={handler}
                data-testid={dataTestId}
                placeholder={placeholder || name}
            />
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
}

export default Text
