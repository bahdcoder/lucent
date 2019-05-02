import React from 'react'
import classnames from 'classnames'

const Boolean = ({ checked = false, dataTestId }) => (
    <div className="flex items-center">
        <span
            data-testid={dataTestId}
            className={classnames('w-2 h-2 mr-3 rounded-full', {
                'bg-red': !checked,
                'bg-green': checked
            })}
        />
        {checked ? 'Yes' : 'No'}
    </div>
)

export default Boolean
