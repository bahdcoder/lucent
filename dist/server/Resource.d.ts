import { IResource } from './index.d';
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
    fields(): never[];
    /**
     *
     * Get all actions for this resource
     *
     * @return {Array}
     *
     */
    actions(): never[];
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
    authorizedToCreate(): boolean;
    /**
     * Determine if current user is authorized to view this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToView(): boolean;
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
    authorizedToUpdate(): boolean;
    /**
     * Determine if current user is authorized to delete this resource
     *
     * @return {Boolean}
     *
     */
    authorizedToDelete(): boolean;
    /**
     * Define a hook for modifying this field before it is saved.
     * It receives the data to be saved, and is expected to
     * return the data, maybe modified.
     *
     * @param {Object} data
     *
     * @return {Promise}
     */
    beforeSave(data: object): Promise<any>;
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
     * @return {void}
     *
     */
    perPage(): number;
    /**
     *
     * A resource can be serialized
     *
     * @return {Array|Object}
     *
     */
    serialize(): {
        name: string;
        slug: string;
        title: string;
        fields: never[];
        perPage: number;
        primaryKey: string;
        collection: string;
        authorizedToView: boolean;
        authorizedToCreate: boolean;
        authorizedToUpdate: boolean;
        authorizedToDelete: boolean;
        actions: any[];
    };
}
