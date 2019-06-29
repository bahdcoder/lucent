import React from 'react'
import Checkbox from '../Checkbox'

const BooleanFilter = ({ handler, options, name, value, ...rest }) => (
    <React.Fragment>
        {options.map(option => (
            <div className="w-full" key={option.value}>
                <div className="mt-2">
                    <Checkbox
                        {...rest}
                        label={option.label}
                        value={option.value}
                        id={`${name}-${option.value}`}
                        name={`${name}-${option.value}`}
                        checked={value.includes(option.value)}
                        handler={() =>
                            handler({
                                name,
                                value: value.includes(option.value)
                                    ? value.filter(v => v !== option.value)
                                    : [...value, option.value]
                            })
                        }
                    />
                </div>
            </div>
        ))}
    </React.Fragment>
)

export default BooleanFilter
