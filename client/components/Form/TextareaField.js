import React from 'react'
import TextField from './TextField'

const TextareaField = props => (
    <TextField textarea {...props} className="py-4 h-auto" rows={props.field.rowsCount} />
)

export default TextareaField
