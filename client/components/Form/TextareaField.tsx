import * as React from 'react'
import TextField, { FieldPropsInterface } from './TextField'

const TextareaField = (props: FieldPropsInterface) => (
    <TextField textarea {...props} className="py-4 h-auto" rows={4} cols={4} />
)

export default TextareaField
