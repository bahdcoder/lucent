import React from 'react'

const Sidebar = ({ Link }) => {
    return (
        <div className="w-full px-6 py-6 border-t border-gray-700 mt-5">
            <span className="flex items-center">
                <span className="text-sm text-gray-600 tracking-widest">
                    USERS & PERMISSIONS
                </span>
            </span>

            <div className="flex flex-col mt-3 text-white">
                <Link className="mt-3" to={`/resources/users`}>
                    Users
                </Link>
                <Link className="mt-3" to={`/resources/roles`}>
                    Roles
                </Link>
                <Link className="mt-3" to={`/resources/permissions`}>
                    Permissions
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
