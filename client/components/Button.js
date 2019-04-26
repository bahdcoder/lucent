import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const Button = ({
    to,
    label = '',
    className = '',
    link = false,
    type = 'primary',
    handler
}) => {
    let ButtonElement = link ? Link : 'button'

    return (
        <ButtonElement
            to={to}
            onClick={handler}
            className={classnames(
                'trans-30 no-underline text-white rounded-lg px-8 h-9 flex items-center focus:outline-none',
                {
                    'bg-indigo hover:bg-indigo-dark': type === 'primary',
                    'bg-red-light hover:bg-red-dark': type === 'danger'
                },
                className
            )}
        >
            {label}
        </ButtonElement>
    )
}

export default Button