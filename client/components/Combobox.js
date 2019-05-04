import React, { useState } from 'react'
import Text from './Text'
import { debounce } from 'throttle-debounce'

const RenderSelected = ({ resource, selected, removeItem, loadMore }) => {
    const Svg = Pangaso.components['component-svg']

    return (
        <div className="w-full flex flex-wrap">
            {selected.map(option => (
                <div
                    key={option[resource.primaryKey]}
                    className="w-1/3 mt-2 px-4 block rounded-lg h-10 flex items-center justify-between border border-grey shadow"
                >
                    <span>{option[resource.displayValue]}</span>

                    <Svg
                        icon="trash"
                        onClick={() => removeItem(option)}
                        className="text-grey hover:text-indigo"
                    />
                </div>
            ))}
        </div>
    )
}

class Combobox extends React.Component {
    state = {
        query: '',
        data: {
            data: [],
            total: 0
        },
        isFetching: true,
        optionsOpen: false,
        selected: []
    }

    handleChange = event => {
        const query = event.target.value

        this.setState(
            {
                query,
                optionsOpen: !!query,
                isFetching: true
            },
            () => query && this.search(query)
        )
    }

    /**
     *
     * Remove escape key event listener
     *
     */
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeOptions, false)
    }

    /**
     *
     * Here, we'll check if value prop was passed. If it was,
     * then we'll fetch the matching records and set
     * on this component.
     *
     */
    componentDidMount() {
        const {
            field,
            editing,
            multiple,
            parentResource,
            parentRecord
        } = this.props

        if (editing && multiple) {
            Pangaso.request()
                .get(
                    `/resources/${parentResource.slug}/${
                        parentRecord[parentResource.primaryKey]
                    }/has-many/${field.attribute}`
                )
                .then(({ data }) => {
                    this.setState({
                        selected: data.data
                    })
                })
        }

        if (editing && !multiple) {
            Pangaso.request()
                .get(
                    `/resources/${parentResource.slug}/${
                        parentRecord[parentResource.primaryKey]
                    }/has-one/${field.attribute}`
                )
                .then(({ data }) => {
                    this.setState({
                        selected: data ? [data] : []
                    })
                })
        }

        document.addEventListener('keydown', this.closeOptions, false)
    }

    closeOptions = ({ keyCode }) => {
        keyCode === 27 &&
            this.setState({
                query: '',
                optionsOpen: false
            })
    }

    /**
     *
     * Search the server with specific query
     *
     * @return {null}
     *
     */
    search = debounce(500, query => {
        const { resource } = this.props

        Pangaso.request()
            .get(`/resources/${resource.slug}/search?query=${query}`)
            .then(({ data }) => {
                this.setState({
                    data: {
                        ...data,
                        data: data.data.filter(
                            record =>
                                !this.state.selected.find(
                                    selectedItem =>
                                        selectedItem[resource.primaryKey] ===
                                        record[resource.primaryKey]
                                )
                        )
                    },
                    isFetching: false
                })
            })
    })

    /**
     *
     * Handle options selected
     *
     * @return {null}
     *
     */
    handleSelect = option => {
        const { data } = this.state
        const { resource, multiple } = this.props

        let newSelected = [option]

        if (multiple) {
            newSelected = [...newSelected, ...this.state.selected]
        }

        this.setState(
            {
                selected: newSelected,
                data: {
                    ...data,
                    data: data.data.filter(
                        record =>
                            !newSelected.find(
                                selectedItem =>
                                    selectedItem[resource.primaryKey] ===
                                    record[resource.primaryKey]
                            )
                    )
                },
                optionsOpen: multiple
            },
            () => this.triggerHandler()
        )
    }

    /**
     *
     * Trigger the handler on the
     * parent component
     *
     */
    triggerHandler = () => {
        const { name, handler, resource, multiple } = this.props

        const value = this.state.selected.map(item => item[resource.primaryKey])

        handler &&
            handler({
                name,
                value: multiple ? value : value[0] || null,
                type: multiple ? 'MultiSelect' : 'SingleSelect'
            })
    }

    /**
     *
     * Remove an item from the list of selected
     *
     * @param {object} item
     *
     * @return {null}
     *
     */
    removeItem = item => {
        const { resource } = this.props

        this.setState(
            {
                selected: this.state.selected.filter(
                    selectedItem =>
                        selectedItem[resource.primaryKey] !==
                        item[resource.primaryKey]
                )
            },
            () => this.triggerHandler()
        )
    }

    render() {
        const { resource, placeholder } = this.props
        const { optionsOpen, query, data, selected, isFetching } = this.state

        return (
            <div className="relative w-full">
                <Text
                    value={query}
                    className="w-full"
                    handler={this.handleChange}
                    placeholder={`Search for ${placeholder}`}
                />

                {optionsOpen && (
                    <div className="trans-30 border z-50 w-full absolute bg-white text-grey-darkest mt-1 rounded-b shadow-md focus:outline-none focus:border-2 max-h-48 border-grey focus:border-indigo overflow-y-auto">
                        {!isFetching &&
                            data.data.map(option => (
                                <span
                                    key={option[resource.primaryKey]}
                                    onClick={() => this.handleSelect(option)}
                                    className="trans-30 w-full hover:bg-grey-lighter py-3 px-3 cursor-pointer block"
                                >
                                    {option[resource.displayValue]}
                                </span>
                            ))}
                        {!isFetching && data.data.length === 0 && (
                            <span className="w-full block py-5 flex items-center justify-center">
                                No results
                            </span>
                        )}
                        {isFetching && (
                            <span className="w-full block py-5 flex items-center justify-center">
                                Loading ...
                            </span>
                        )}
                    </div>
                )}
                <RenderSelected
                    resource={resource}
                    selected={selected}
                    removeItem={this.removeItem}
                />
            </div>
        )
    }
}

export default Combobox
