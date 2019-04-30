import React from 'react'
import classnames from 'classnames'
import ImageExtensions from 'image-extensions'

import Svg from '../Svg'

const File = ({ table = false, content }) => {
    if (!content) return null

    const ext = content.split('.').pop()

    let FileContent = null

    if (ImageExtensions.includes(ext)) {
        FileContent = (
            <img
                src={content}
                className={classnames('border border-grey-lighter rounded', {
                    'w-12 h-12 rounded shadow': table,
                    'w-1/4': !table
                })}
            />
        )
    }

    if (ext === 'pdf') {
        FileContent = <Svg icon="pdf" width="40" height="40" />
    }

    if (['3gp', 'mp4', 'flv'].includes(ext)) {
        FileContent = <Svg icon="video" width="40" height="40" />
    }

    if (ext === 'zip') {
        FileContent = <Svg icon="zip" width="40" height="40" />
    }

    return (
        <a
            className={classnames({
                'no-underline text-indigo hover:text-indigo-light': !FileContent
            })}
            href={content}
            target="_blank"
        >
            {FileContent || 'View File'}
        </a>
    )
}

export default File
