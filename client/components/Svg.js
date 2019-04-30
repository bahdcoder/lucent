import React from 'react'
import classnames from 'classnames'

const Svg = ({ icon = 'eye', width = 20, height = 20, className, ...rest }) => {
    const icons = {
        eye: (
            <svg
                {...rest}
                width="22"
                height="18"
                role="presentation"
                viewBox="0 0 22 16"
                aria-labelledby="view"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current', className)}
            >
                <path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
        ),

        pencil: (
            <svg
                {...rest}
                width={width}
                height={height}
                viewBox="0 0 20 20"
                role="presentation"
                aria-labelledby="edit"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current', className)}
            >
                <path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" />
            </svg>
        ),

        trash: (
            <svg
                {...rest}
                width={width}
                height={height}
                viewBox="0 0 20 20"
                role="presentation"
                aria-labelledby="delete"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames('fill-current cursor-pointer', className)}
            >
                <path
                    fillRule="nonzero"
                    d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                />
            </svg>
        ),

        lens: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 20 20"
                aria-labelledby="search"
                role="presentation"
                className={classnames('fill-current', className)}
            >
                <path
                    fillRule="nonzero"
                    d="M14.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387a8 8 0 1 1 1.414-1.414zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                />
            </svg>
        ),

        pdf: (
            <svg
                width={width}
                height={height}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 309.267 309.267"
                style={{ enableBackground: 'new 0 0 309.267 309.267' }}
                xmlSpace="preserve"
            >
                <g>
                    <path
                        style={{ fill: '#E2574C' }}
                        d="M38.658,0h164.23l87.049,86.711v203.227c0,10.679-8.659,19.329-19.329,19.329H38.658
                        c-10.67,0-19.329-8.65-19.329-19.329V19.329C19.329,8.65,27.989,0,38.658,0z"
                    />
                    <path
                        style={{ fill: '#B53629' }}
                        d="M289.658,86.981h-67.372c-10.67,0-19.329-8.659-19.329-19.329V0.193L289.658,86.981z"
                    />
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M217.434,146.544c3.238,0,4.823-2.822,4.823-5.557c0-2.832-1.653-5.567-4.823-5.567h-18.44
                        c-3.605,0-5.615,2.986-5.615,6.282v45.317c0,4.04,2.3,6.282,5.412,6.282c3.093,0,5.403-2.242,5.403-6.282v-12.438h11.153
                        c3.46,0,5.19-2.832,5.19-5.644c0-2.754-1.73-5.49-5.19-5.49h-11.153v-16.903C204.194,146.544,217.434,146.544,217.434,146.544z
                        M155.107,135.42h-13.492c-3.663,0-6.263,2.513-6.263,6.243v45.395c0,4.629,3.74,6.079,6.417,6.079h14.159
                        c16.758,0,27.824-11.027,27.824-28.047C183.743,147.095,173.325,135.42,155.107,135.42z M155.755,181.946h-8.225v-35.334h7.413
                        c11.221,0,16.101,7.529,16.101,17.918C171.044,174.253,166.25,181.946,155.755,181.946z M106.33,135.42H92.964
                        c-3.779,0-5.886,2.493-5.886,6.282v45.317c0,4.04,2.416,6.282,5.663,6.282s5.663-2.242,5.663-6.282v-13.231h8.379
                        c10.341,0,18.875-7.326,18.875-19.107C125.659,143.152,117.425,135.42,106.33,135.42z M106.108,163.158h-7.703v-17.097h7.703
                        c4.755,0,7.78,3.711,7.78,8.553C113.878,159.447,110.863,163.158,106.108,163.158z"
                    />
                </g>
            </svg>
        ),

        video: (
            <svg
                width={width}
                height={height}
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 58 58"
                style={{ enableBackground: 'new 0 0 58 58' }}
                xmlSpace="preserve"
            >
                <rect
                    x={1}
                    y={7}
                    style={{
                        fill: '#7383BF',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={56}
                    height={44}
                />
                <polygon
                    style={{ fill: '#FFFFFF' }}
                    points="25,36 25,28.954 25,22 36,29 "
                />
                <rect
                    x={1}
                    y={7}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={1}
                    y={18}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={1}
                    y={29}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={1}
                    y={40}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={47}
                    y={7}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={47}
                    y={18}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={47}
                    y={29}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
                <rect
                    x={47}
                    y={40}
                    style={{
                        fill: '#556080',
                        stroke: '#424A60',
                        strokeWidth: 2,
                        strokeMiterlimit: 10
                    }}
                    width={10}
                    height={11}
                />
            </svg>
        ),

        zip: (
            <svg
                width={width}
                height={height}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: 'new 0 0 512 512' }}
                xmlSpace="preserve"
            >
                <path
                    style={{ fill: '#E2E5E7' }}
                    d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
                />
                <path
                    style={{ fill: '#B0B7BD' }}
                    d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
                />
                <polygon
                    style={{ fill: '#CAD1D8' }}
                    points="480,224 384,128 480,128 "
                />
                <path
                    style={{ fill: '#84BD5A' }}
                    d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16
                    V416z"
                />
                <g>
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M132.64,384c-8.064,0-11.264-7.792-6.656-13.296l45.552-60.512h-37.76
                        c-11.12,0-10.224-15.712,0-15.712h51.568c9.712,0,12.528,9.184,5.632,16.624l-43.632,56.656h41.584
                        c10.24,0,11.52,16.256-1.008,16.256h-55.28V384z"
                    />
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M212.048,303.152c0-10.496,16.896-10.88,16.896,0v73.04c0,10.608-16.896,10.88-16.896,0V303.152z"
                    />
                    <path
                        style={{ fill: '#FFFFFF' }}
                        d="M251.616,303.152c0-4.224,3.328-8.832,8.704-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48
                        c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.704-3.184-8.704-8.816
                        L251.616,303.152L251.616,303.152z M268.496,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504
                        c0-8.944-6.784-16.368-15.36-16.368H268.496z"
                    />
                </g>
                <path
                    style={{ fill: '#CAD1D8' }}
                    d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
                />
            </svg>
        )
    }

    const Icon = icons[icon]

    if (!Icon) return null

    return Icon
}

export default Svg
