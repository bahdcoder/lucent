import React from 'react'
import BaseMultiSelect from '@khanacademy/react-multi-select'

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

const MultiSelect = ({
    value = [],
    options = [],
    name,
    handler,
    dataTestId,
    filterOptions,
    isLoading = false
}) => (
    <BaseMultiSelect
        selected={value}
        options={options}
        isLoading={isLoading}
        data-testid={dataTestId}
        ItemRenderer={ItemRenderer}
        filterOptions={filterOptions}
        onSelectedChanged={selected =>
            handler({ name, value: selected, type: 'MultiSelect' })
        }
    />
)

export default MultiSelect
