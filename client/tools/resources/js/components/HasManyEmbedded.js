import React from 'react'
import { fireEvent } from 'react-testing-library'

class HasManyEmbedded extends React.Component {
    /**
     *
     * Get the fields shown for creation
     *
     * @return {array}
     *
     */
    getCreationFields = () =>
        this.props.fields.filter(
            field => !field.hideOnCreationForm && !field.computed
        )

    /**
     *
     * Get the fields shown for update
     *
     * @return {array}
     *
     */
    getUpdateFields = () =>
        this.props.fields.filter(
            field => !field.hideOnUpdateForm && !field.computed
        )

    /**
     * Add a new item to list
     */
    addNewItem = () => {
        this.setState({
            list: [...this.state.list, {}]
        })
    }

    /**
     * Handle a list item change
     */
    handleListItemChange = () => {}

    /**
     *
     * Get a field from the component registry
     */
    getField = component => Pangaso.fields[component]

    render() {
        const {
            attribute,
            name,
            fields,
            value,
            errors,
            removeItem,
            addNewItem,
            handleChange
        } = this.props

        const Button = Pangaso.components['component-button']

        return (
            <React.Fragment>
                <div className="mt-8">
                    <h3 className="font-thin text-2xl">{name}</h3>

                    {value.map((listItem, listItemIndex) => {
                        return (
                            <React.Fragment key={listItemIndex}>
                                <div className="w-full mt-6 h-12 flex justify-between">
                                    <span className="text-xl">
                                        Item {listItemIndex + 1}
                                    </span>

                                    <Button
                                        type="danger"
                                        label={'Remove'}
                                        handler={() =>
                                            removeItem(listItemIndex)
                                        }
                                    />
                                </div>
                                <div className="bg-white rounded-lg">
                                    {fields.map((field, index) => {
                                        const Field = this.getField(
                                            field.component
                                        )

                                        const fieldValue =
                                            listItem[field.attribute]

                                        return Field ? (
                                            <div
                                                key={index}
                                                className="w-full border-b flex items-center border-grey-light py-6 px-12"
                                            >
                                                <label className="w-1/4 text-lg font-thin text-grey-dark">
                                                    {field.name}
                                                </label>

                                                <div className="w-2/4 flex flex-col">
                                                    <Field
                                                        {...field}
                                                        className="w-full"
                                                        id={field.attribute}
                                                        name={field.attribute}
                                                        placeholder={field.name}
                                                        handler={event => {
                                                            let value

                                                            if (event.date) {
                                                                value =
                                                                    event.date
                                                            } else if (
                                                                event.target
                                                                    .type ===
                                                                'checkbox'
                                                            ) {
                                                                value = !fieldValue
                                                            } else if (
                                                                event.target
                                                                    .files
                                                            ) {
                                                                value =
                                                                    event.target
                                                                        .files[0]
                                                            } else {
                                                                value =
                                                                    event.target
                                                                        .value
                                                            }

                                                            handleChange(
                                                                {
                                                                    attribute,
                                                                    name:
                                                                        field.attribute,
                                                                    value,
                                                                    index: listItemIndex
                                                                },
                                                                attribute,
                                                                true
                                                            )
                                                        }}
                                                        error={
                                                            errors[
                                                                listItemIndex
                                                            ] &&
                                                            errors[
                                                                listItemIndex
                                                            ][field.attribute]
                                                        }
                                                        dataTestId={`field-${attribute}-${
                                                            field.attribute
                                                        }`}
                                                        dateOptions={{
                                                            enableTime:
                                                                field.enableTime
                                                        }}
                                                        options={field.options}
                                                        value={fieldValue}
                                                    />
                                                </div>
                                            </div>
                                        ) : null
                                    })}
                                </div>
                            </React.Fragment>
                        )
                    })}

                    <Button
                        className="my-5"
                        label={'Add new item'}
                        handler={addNewItem}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default HasManyEmbedded
