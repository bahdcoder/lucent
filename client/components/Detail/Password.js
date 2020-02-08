import React from 'react'

const Password = ({ content, dataTestId }) => (
    <div data-testid={dataTestId} className="font-light text-gray-700">
        {content}
    </div>
)

export default Password
