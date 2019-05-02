import React from 'react'
import classnames from 'classnames'

const TextField = ({
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
                    'border text-grey-darkest my-3 px-5 rounded-lg shadow focus:outline-none focus:border-2',
                    {
                        'h-10': !textarea,
                        'border-grey focus:border-indigo': !error,
                        'border-red focus:border-red': error
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
                <span data-testid={`${dataTestId}-error`} className="text-xs text-red font-thin">{error}</span>
            )}
        </React.Fragment>
    )
}

export default TextField
