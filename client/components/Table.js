import React from 'react'
import classnames from 'classnames'

const Table = ({
    resource,
    selectedAction = '',
    setSelectedAction,
    headers = [],
    rows = [],
    selected = [],
    selectAll,
    toggleSelect,
    triggerMultiDelete,
    triggerRunAction,
    Link
}) => (
    <div className="w-full bg-white rounded-t-lg shadow mt-4">
        <div className="h-16 flex justify-between items-center">
            <div className="w-20 flex justify-center items-center">
                <input
                    type="checkbox"
                    onChange={selectAll}
                    checked={selected.length === rows.length}
                />
            </div>

            <div className="flex items-center justify-end w-1/3">
                {resource.actions.length > 0 && selected.length > 0 && (
                    <React.Fragment>
                        <select
                            value={selectedAction.id}
                            onChange={setSelectedAction}
                            className="bg-white focus:outline-none text-grey-darkest my-3 border border-grey h-10 px-3 rounded-lg shadow focus:outline-none focus:border-indigo focus:border-2 w-2/4"
                        >
                            <option value="">
                                Select an action
                            </option>
                            {resource.actions.map(action => (
                                <option value={action.id} key={action.id}>
                                    {action.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={triggerRunAction}
                            className={classnames(
                                'ml-3 focus:outline-none cursor-pointer trans-30 h-10 flex items-center justify-center rounded-lg px-3',
                                {
                                    'bg-indigo hover:bg-indigo-dark': selectedAction,
                                    'bg-indigo-lighter cursor-not-allowed': !selectedAction
                                }
                            )}
                        >
                            <svg
                                width={20}
                                height={20}
                                className="fill-current text-white font-bold h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                id="Capa_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 41.999 41.999"
                                style={
                                    {
                                        enableBackground:
                                            'new 0 0 41.999 41.999'
                                    }
                                }
                                xmlSpace="preserve"
                            >
                                <g>
                                    <path
                                        d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z"
                                        className="active-path"
                                    />
                                </g>{' '}
                            </svg>
                        </button>
                    </React.Fragment>
                )}

                {selected.length > 0 && (
                    <div className="w-16 flex items-center justify-center">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            role="presentation"
                            aria-labelledby="delete"
                            onClick={triggerMultiDelete}
                            className="trans-30 fill-current text-grey cursor-pointer hover:text-indigo-dark"
                        >
                            <path
                                fillRule="nonzero"
                                d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                            />
                        </svg>
                    </div>
                )}
            </div>
        </div>

        <table className="w-full" cellSpacing="0" cellPadding="0">
            <thead className="w-full">
                <tr className="bg-grey-lighter w-full font-bold text-xs text-left uppercase border-b-2 tracking-wide align-middle">
                    <React.Fragment>
                        <th className="py-3 w-20 px-0" />
                        {headers.map((field, index) => (
                            <th className="py-3 px-0" key={index}>
                                {field.name.toUpperCase()}
                            </th>
                        ))}
                        <th className="py-3 w-12 px-0" />
                    </React.Fragment>
                </tr>
            </thead>

            <tbody>
                {rows.map(row => (
                    <tr
                        key={row[resource.primaryKey]}
                        className="trans-30 border-b border-grey-light hover:bg-grey-lighter"
                    >
                        <React.Fragment>
                            <td className="text-left flex justify-center items-center w-20 h-14">
                                <input
                                    onChange={() => toggleSelect(row)}
                                    checked={selected.includes(
                                        // @ts-ignore
                                        row[resource.primaryKey]
                                    )}
                                    type="checkbox"
                                    value={row[resource.primaryKey]}
                                />
                            </td>
                            {headers.map((field, index) => (
                                <td className="text-left h-14" key={index}>
                                    {row[field.attribute]}
                                </td>
                            ))}
                            <td className="text-left pr-6">
                                <span className="flex items-center justify-end flex-grow">
                                    <Link
                                        to={`/resources/${resource.slug}/${
                                            row[resource.primaryKey]
                                        }/details`}
                                        className="trans-30 text-grey cursor-pointer hover:text-indigo-dark"
                                    >
                                        <svg
                                            width="22"
                                            height="18"
                                            role="presentation"
                                            viewBox="0 0 22 16"
                                            className="fill-current"
                                            aria-labelledby="view"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                        </svg>
                                    </Link>
                                    <Link
                                        to={`/resources/${resource.slug}/${
                                            row[resource.primaryKey]
                                        }/edit`}
                                        className="trans-30 text-grey ml-3 cursor-pointer hover:text-indigo-dark"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            role="presentation"
                                            className="fill-current"
                                            aria-labelledby="edit"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" />
                                        </svg>
                                    </Link>

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        role="presentation"
                                        aria-labelledby="delete"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => triggerMultiDelete(row[resource.primaryKey])}
                                        className="fill-current text-grey ml-3 cursor-pointer hover:text-indigo-dark"
                                    >
                                        <path
                                            fillRule="nonzero"
                                            d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                                        />
                                    </svg>
                                </span>
                            </td>
                        </React.Fragment>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default Table
