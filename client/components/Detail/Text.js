import React from 'react'

const Text = ({ content, dataTestId }) => (
    <div data-testid={dataTestId} className="font-light text-gray-700">
        {content}
    </div>
)

export default Text
