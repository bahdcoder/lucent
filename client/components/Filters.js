import React, { useState } from 'react'

// components
import Svg from './Svg'
import Select from './Select'

const Filters = ({
    resource,
    perPage,
    resetFilters,
    filters = {},
    filtersActive,
    handlePerPageChange,
    handleFilterChange
}) => {
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const perPageOptions = (resource.perPageOptions || []).map(option => ({
        label: option,
        value: option
    }))

    const renderFilter = filter => {
        const Field = Pangaso.filters[filter.component]

        return Field ? (
            <React.Fragment>
                <h3 className="text-sm uppercase tracking-wide text-80 bg-grey-lighter p-3">
                    {filter.name}
                </h3>

                <div className="p-3">
                    <Field
                        className="w-full my-0"
                        name={filter.attribute}
                        options={filter.options}
                        handler={handleFilterChange}
                        value={filters[filter.attribute]}
                        enableTime={filter.enableTime}
                    />
                </div>
            </React.Fragment>
        ) : null
    }

    return (
        <div className="relative">
            <span
                onClick={() => setDropDownOpen(!dropDownOpen)}
                className="px-4 bg-grey-lighter border rounded flex w-full items-center py-2 cursor-pointer"
            >
                <Svg icon="filter" className="text-grey cursor-pointer" />
                <Svg icon="caret" fill="#b8c2cc" className="ml-2" />
                <span className="ml-2 inline-block font-bold">
                    {filtersActive ? 'ON' : 'OFF'}
                </span>
            </span>
            {dropDownOpen && (
                <div className="absolute pin-r shadow-lg w-64 border border-grey bg-white mt-3 z-50 rounded-lg">
                    {filtersActive && (
                        <h3
                            onClick={resetFilters}
                            className="text-sm uppercase border-b border-grey tracking-wide text-80 bg-grey-lighter p-3 cursor-pointer"
                        >
                            Reset Filters
                        </h3>
                    )}
                    <h3 className="text-sm uppercase tracking-wide text-80 bg-grey-lighter p-3">
                        Per Page
                    </h3>

                    <div className="p-2">
                        <Select
                            className="w-full my-0"
                            options={perPageOptions}
                            value={perPage}
                            handler={event =>
                                handlePerPageChange(event.target.value)
                            }
                        />
                    </div>

                    {resource.filters.map((filter, index) => (
                        <React.Fragment key={`${filter.attribute}-${index}`}>
                            {renderFilter(filter)}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Filters
