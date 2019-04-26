import React from 'react'

const Checkbox = ({ id, checked = false, label, handler, value, name }) => (
    <React.Fragment>
        <input
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={checked}
            onChange={handler}
            className="checkbox"
        />
        <label htmlFor={id}>{label}</label>
    </React.Fragment>
)

export default Checkbox
