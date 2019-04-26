import React from 'react'
import classnames from 'classnames'

const Svg = ({ icon = 'eye', width = 20, height = 20, className, ...rest }) => {
    const icons = {
        eye: (
            <svg
                {...rest}
                width="22"
                height="18"
                role="presentation"
                viewBox="0 0 22 16"
                aria-labelledby="view"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current', className)}
            >
                <path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
        ),

        pencil: (
            <svg
                {...rest}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                role="presentation"
                aria-labelledby="edit"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current', className)}
            >
                <path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" />
            </svg>
        ),

        trash: (
            <svg
                {...rest}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                role="presentation"
                aria-labelledby="delete"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current cursor-pointer', className)}
            >
                <path
                    fillRule="nonzero"
                    d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                />
            </svg>
        ),

        lens: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                aria-labelledby="search"
                role="presentation"
                className={classnames('fill-current', className)}
            >
                <path
                    fillRule="nonzero"
                    d="M14.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387a8 8 0 1 1 1.414-1.414zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                />
            </svg>
        )
    }

    const Icon = icons[icon]

    if (!Icon) return null

    return Icon
}

export default Svg
