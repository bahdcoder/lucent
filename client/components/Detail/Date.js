import React from 'react'
import format from 'date-fns/format'

const DateDetail = ({ content, dateFormat }) => (
    <div>{format(content, dateFormat)}</div>
)

export default DateDetail
