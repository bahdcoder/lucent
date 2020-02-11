import { IResource, IField, IUser } from './index.d';
export declare class BaseResource implements IResource {
    /**
     *
     * Get the field to use as primary key for this resource
     *
     * @return {string}
     *
     */
    primaryKey(): string;
    /**
     *
     * Get the resource name
     *
     * @return {String}
     *
     */
    name(): string;
    /**
     *
     * Get the resource title
     *
     * @return {String}
     *
     */
    title(): string;
    /**
     *
     * Get all fields for this resource
     *
     * @return {Array}
     *
     */
    fields(): IField[];
    /**
     * Get all non computed fields for this resource
     *
     * @return {Array}
     */
    nonComputedFields(): IField[];
    /**
     *
     * Get the value to be used to display this resource
     *
     */
    displayValue(): string;
    /**
     *
     * Determine if this resource should be shown in the navigation or not
     */
    availableForNavigation(): boolean;
    /**
     *
     * Get all actions for this resource
     *
     * @return {Array}
     *
     */
    actions(): never[];
    /**
     * Get all filters for a resource
     *
     * @return {Array}
     *
     */
    filters(): never[];
    /**
     * Get the schema for this class
     *
     * @return {string}
     *
     */
    collection(): string;
    /**
     * Determine if current user is authorized to create this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToCreate(user: IUser): boolean;
    /**
     * Determine if current user is authorized to view this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToView(user: IUser): boolean;
    /**
     *
     * Return the slug for this resource
     *
     * @return {String}
     *
     */
    slug(): string;
    /**
     * Determine if current user is authorized to update this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToUpdate(user: IUser): boolean;
    /**
     * Determine if current user is authorized to delete this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToDelete(user: IUser): boolean;
    /**
     * Define a hook for modifying this field before it is saved.
     * It receives the data to be saved, and is expected to
     * return the data, maybe modified.
     *
     * @param {Object} data
     *
     * @return {Promise}
     */
    beforeInsert(data: object): Promise<any>;
    /**
     * Define a hook for modifying the resource data before it is updated.
     * It received the data to be updated, and is expected to
     * return the data, maybe modified.
     *
     * @param {Object} data
     *
     * @return {Promise}
     *
     */
    beforeUpdate(data: object): Promise<any>;
    /**
     *
     * Define the items per page
     *
     * @return {integer}
     *
     */
    perPage(): number;
    /**
     *
     * Define the items per page options
     *
     * @return {array}
     *
     */
    perPageOptions(): number[];
    /**
     * These would be the permissions available to
     * this resource.
     */
    permissions(): string[];
    /**
     *
     * A resource can be serialized
     *
     * @return {Array|Object}
     *
     */
    serialize(user: IUser): {
        name: string;
        slug: string;
        title: string;
        fields: IField[];
        perPage: number;
        primaryKey: string;
        collection: string;
        permissions: string[];
        displayValue: string;
        perPageOptions: number[];
        nonComputedFields: IField[];
        authorizedToView: boolean;
        authorizedToCreate: boolean;
        authorizedToUpdate: boolean;
        authorizedToDelete: boolean;
        displayInNavigation: boolean;
        actions: any[];
        filters: object[];
    };
}
