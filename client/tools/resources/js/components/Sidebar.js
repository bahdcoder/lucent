import React from 'react'
import classnames from 'classnames'

const Sidebar = ({ Link }) => {
    return (
        <div className="w-full px-6 py-6 border-t border-gray-700">
            <span className="flex items-center">
                <span
                    className='text-sm text-gray-600 tracking-widest'
                >
                    RESOURCES
                </span>
            </span>

            <div className="flex flex-col mt-3 text-white">
                {Lucent.resources.filter(resource => resource.displayInNavigation).map(resource => (
                    <Link key={resource.slug} to={`/resources/${resource.slug}`} className='mt-3'>
                        {resource.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
