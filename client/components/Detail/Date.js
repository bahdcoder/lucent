import React from 'react'
import format from 'date-fns/format'

const DateDetail = ({ content, dateFormat, dataTestId }) => (
    <div data-testid={dataTestId}>{format(content, dateFormat)}</div>
)

export default DateDetail
