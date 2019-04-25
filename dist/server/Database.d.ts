import { Db } from 'mongodb';
/**
 *
 * This class is in charge of making the database connection
 *
 */
export declare class Database {
    /**
     * The database connection
     *
     * @type {Db}
     *
     */
    private db;
    /**
     *
     * Get the database connection
     *
     * @return {Db|null}
     *
     */
    get(): Db | null;
    /**
     *
     * Set the database connnection
     *
     * @return {Db|null}
     *
     */
    set(db: Db): void;
    /**
     * Fetch a single record from a collection
     *
     * @param {string} collection
     *
     * @param {string} primaryKey
     *
     * @return {Promise}
     *
     */
    find(collection: string, primaryKey: string): Promise<any>;
    /**
     * Fetch all data from a collection
     *
     * @param {string} collection
     *
     * @param {Object} params
     *
     * @return {Promise}
     *
     */
    fetch(collection: string, params?: any, filter?: any): Promise<any>;
    /**
     * Fetch all matching records by a bunch of ids
     *
     * @param {string} collection
     *
     */
    fetchByIds(collection: string, resources: Array<string>): Promise<any[]>;
    /**
     *
     * Delete a specific resource
     *
     * @param {string} collection
     *
     * @param {Array} primaryKeys array of primary keys to be deleted
     *
     * @return {Promise}
     *
     */
    destroy(collection: string, primaryKeys: Array<string>): Promise<any>;
    /**
     *
     * Store a new resoruce into collection
     *
     * @param collection
     *
     * @param data
     *
     * @return {Promise}
     *
     */
    insert(collection: string, data: object): Promise<import("mongodb").InsertOneWriteOpResult>;
    /**
     *
     * Update an existing resource in collection
     *
     * @param collection
     *
     * @param primaryKey
     *
     * @param data
     *
     * @return {Promise}
     *
     */
    update(collection: string, primaryKey: string, data: object): Promise<import("mongodb").FindAndModifyWriteOpResultObject<any>>;
}
export declare const Connection: Database;
