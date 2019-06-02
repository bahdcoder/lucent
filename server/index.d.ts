/**
 *
 * The interface that defines meta data for fields
 *
 */
export interface IFieldMeta {
    helpText: string
}

/**
 *
 * The field interface
 *
 */
export interface IField {
    computed: boolean
    attribute: string
    creationRules: string
    type: string
    fields?: IField[]
    name: string
    resource?: string
    isSearchable: boolean
    computedResolver: Function
}

/**
 *
 * A list of all options that can be passed
 * to the server start function
 *
 */
export interface StartOptions {
    port?: number
    database: string
    databaseUri: string
    startCallback?: Function
}

/**
 *
 * The resource interface
 *
 */
export interface IResource {
    name(): string
    fields(): Array<any>
    schema?(): any
    slug(): string
    title(): string
    serialize(): Object
    authorizedToCreate?(): boolean
    authorizedToView?(): boolean
    authorizedToUpdate?(): boolean
    authorizedToDelete?(): boolean
}

export interface ITools {
    id: string
    name: string
    boot(expressInstance: Express.Application): void
}

export interface IAsset {
    name: string
    path: string
}
