import React from 'react'
import classnames from 'classnames'
import FlatPickr from 'react-flatpickr'

import 'flatpickr/dist/themes/material_green.css'

const DateField = ({
    handler = () => {},
    name = '',
    className,
    dateOptions,
    error,
    ...rest
}) => (
    <React.Fragment>
        <FlatPickr
            onChange={date => handler({ name, date: date[0] })}
            options={dateOptions}
            className={classnames(
                'text-grey-darkest my-3 h-10 pr-3 pl-10 rounded-lg shadow border focus:outline-none focus:border-2',
                {
                    'border-grey focus:border-indigo': !error,
                    'border-red focus:border-red': error
                },
                className
            )}
            readOnly
            {...rest}
        />
        {error && <span className="text-xs text-red font-thin">{error}</span>}
    </React.Fragment>
)

export default DateField
