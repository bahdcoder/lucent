import React from 'react'
import classnames from 'classnames'
import format from 'date-fns/format'
import FlatPickr from 'react-flatpickr'

import 'flatpickr/dist/themes/material_green.css'

const DatePicker = ({
    handler = () => {},
    name = '',
    className,
    dateOptions,
    error,
    dateFormat,
    enableTime = false,
    // ...rest
}) => (
    <React.Fragment>
        <FlatPickr
            options={dateOptions}
            onChange={date =>
                handler({ name, date: format(date[0], dateFormat) })
            }
            data-enable-time={enableTime}
            className={classnames(
                'text-grey-darkest my-3 h-10 pr-3 pl-10 rounded-lg shadow border focus:outline-none focus:border-2',
                {
                    'border-grey focus:border-indigo': !error,
                    'border-red focus:border-red': error
                },
                className
            )}
            placeholder={'Select Date'}
            readOnly
        />
        {error && <span className="text-xs text-red font-light">{error}</span>}
    </React.Fragment>
)

export default DatePicker
