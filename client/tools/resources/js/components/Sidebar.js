import React from 'react'
import classnames from 'classnames'

const Sidebar = ({ Link, location }) => {
    const active = location.pathname.match('/resources')

    const inactive = !active

    return (
        <span className="w-full mb-8 block text-white no-underline font-thin">
            <span className="flex items-center">
                <svg
                    className={classnames('w-5 h-5 mr-5', {
                        'fill-white': active,
                        'fill-indigo-lighter': inactive
                    })}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
                </svg>
                <span
                    className={classnames('text-md trans-30 font-thin', {
                        'text-indigo-lighter': inactive,
                        'text-white': active
                    })}
                >
                    Resources
                </span>
            </span>

            {Pangaso.resources.map(resource => (
                <Link
                    key={resource.slug}
                    data-testid={resource.slug}
                    to={`/resources/${resource.slug}`}
                    className="flex w-full mt-4 items-center no-underline"
                >
                    <span className="w-5 h-5 mr-5" />
                    <span
                        className={classnames(
                            'hover:text-indigo-dark trans-30 text-sm font-thin cursor-pointer',
                            {
                                'text-white font-bold': location.pathname.match(
                                    `/resources/${resource.slug}`
                                ),
                                'text-indigo-lighter font-normal': !location.pathname.match(
                                    `/resources/${resource.slug}`
                                )
                            }
                        )}
                    >
                        {resource.title}
                    </span>
                </Link>
            ))}
        </span>
    )
}

export default Sidebar
