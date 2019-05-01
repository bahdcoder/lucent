import React from 'react'
import BaseMultiSelect from '@khanacademy/react-multi-select'

const students = [
    { id: 0, name: 'Zach Morris' },
    { id: 1, name: 'Kelly Kapowski' },
    { id: 2, name: 'A.C. Slater' },
    { id: 3, name: 'Lisa Turtle' },
    { id: 4, name: 'Jessie Spano' },
    { id: 5, name: 'Samuel Powers' },
    { id: 6, name: 'Tori Scott' }
]

const studentsList = students.map(s => ({
    value: s.id,
    label: s.name
}))

const ItemRenderer = ({ option, checked, onClick }) => {
    const Checkbox = Pangaso.components['component-checkbox']

    return (
        <span>
            <Checkbox
                handler={onClick}
                checked={checked}
                id={`option-${option.value}`}
            />
            <span>{option.label}</span>
        </span>
    )
}

const MultiSelect = ({ value = [], options = [], name, handler }) => (
    <BaseMultiSelect
        selected={value}
        options={options}
        ItemRenderer={ItemRenderer}
        onSelectedChanged={selected =>
            handler({ name, value: selected, type: 'MultiSelect' })
        }
    />
)

export default MultiSelect
