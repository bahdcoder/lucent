import React from 'react'

const Num = ({ content, dataTestId }) => (
    <div data-testid={dataTestId} className="font-light text-gray-700">
        {content}
    </div>
)

export default Num
