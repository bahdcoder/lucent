import React from 'react'

const Text = ({ content, dataTestId }) => (
    <div data-testid={dataTestId}>{content}</div>
)

export default Text
