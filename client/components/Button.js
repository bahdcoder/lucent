import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const Button = ({
    to,

    handler,
    dataTestId,
    label = '',
    link = false,
    external = false,
    className = '',
    type = 'primary'
}) => {
    let ButtonElement = link ? external ? 'a' : Link : 'button'

    return (
        <ButtonElement
            to={to}
            href={to}
            target='_blank'
            onClick={handler}
            data-testid={dataTestId}
            className={classnames(
                'transition duration-150 ease-in-out no-underline uppercase font-medium tracking-widest text-sm text-white rounded-sm px-6 py-2 flex items-center focus:outline-none',
                {
                    'bg-gray-800 hover:bg-gray-700': type === 'primary',
                    'bg-red-500': type === 'danger'
                },
                className
            )}
        >
            {label}
        </ButtonElement>
    )
}

export default Button
