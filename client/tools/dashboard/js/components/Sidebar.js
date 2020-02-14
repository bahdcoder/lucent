import React from 'react'
import classnames from 'classnames'

const Sidebar = ({ Link }) => (
    <Link
        to={`/`}
        className="w-full px-6 py-6 inline-block text-white"
    >
        Dashboard
    </Link>
)

export default Sidebar
