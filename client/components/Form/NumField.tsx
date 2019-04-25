import * as React from 'react'
import TextField, { FieldPropsInterface } from './TextField'

const NumField = (props: FieldPropsInterface) => (
    <TextField type="number" {...props} />
)

export default NumField
