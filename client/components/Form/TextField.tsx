import * as React from 'react'
import classnames from 'classnames'

export interface FieldPropsInterface {
    className?: string
    name?: string
    placeholder?: string
    value?: string
    handler?(event?: any): void
    type?: string
    error?: string
    textarea?: boolean
    rows?: number
    cols?: number
    dateOptions?: {
        enableTime?: boolean
        defaultDate?: string
    }
}

const TextField = ({
    className = '',
    name = '',
    placeholder = '',
    value = '',
    type = 'text',
    error,
    rows,
    cols,
    textarea = false,
    handler = () => {}
}: FieldPropsInterface) => {
    const Component: any = textarea ? 'textarea' : 'input'

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
                placeholder={placeholder || name}
            />
            {error && (
                <span className="text-xs text-red font-thin">{error}</span>
            )}
        </React.Fragment>
    )
}

export default TextField
