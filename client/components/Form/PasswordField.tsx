import * as React from 'react'
import TextField, { FieldPropsInterface } from './TextField'

const PasswordField = (props: FieldPropsInterface) => (
    <TextField type="password" {...props} />
)

export default PasswordField
