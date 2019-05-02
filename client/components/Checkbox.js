import React from 'react'

const Checkbox = ({
    id,
    checked = false,
    label,
    handler,
    value,
    name,
    dataTestId
}) => (
    <React.Fragment>
        <input
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={checked}
            onChange={handler}
            className="checkbox"
            data-testid={dataTestId}
        />
        <label htmlFor={id}>{label}</label>
    </React.Fragment>
)

export default Checkbox
