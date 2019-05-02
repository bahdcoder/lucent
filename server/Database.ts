import { Db, ObjectID } from 'mongodb'

/**
 *
 * This class is in charge of making the database connection
 *
 */
export class Database {
    /**
     * The database connection
     *
     * @type {Db}
     *
     */
    private db: Db | null = null

    /**
     *
     * Get the database connection
     *
     * @return {Db|null}
     *
     */
    public get(): Db | null {
        return this.db
    }

    /**
     *
     * Set the database connnection
     *
     * @return {Db|null}
     *
     */
    public set(db: Db): void {
        this.db = db
    }

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
    public async find(collection: string, primaryKey: string) {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .findOne({ _id: new ObjectID(primaryKey) })
    }

    /**
     * Fetch all data from a collection
     *
     * @param {string} collection
     *
     * @param {string} primaryKey
     *
     * @return {Promise}
     *
     */
    public async fetchAll(collection: string): Promise<any> {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .find({})
            .toArray()
    }

    /**
     * Fetch all data from a collection, with pagination and limits
     *
     * @param {string} collection
     *
     * @param {Object} params
     *
     * @return {Promise}
     *
     */
    public async fetch(
        collection: string,
        params: any = {},
        filter: any = {}
    ): Promise<any> {
        //  TODO: figure out how to get count and data in one query.

        return {
            // @ts-ignore
            total: await this.get()
                .collection(collection)
                .find(filter)
                .count(),

            // @ts-ignore
            data: await this.get()
                .collection(collection)
                .find(filter)
                .skip(params.limit * (params.page - 1))
                .limit(params.limit)
                .toArray()
        }
    }

    /**
     * Fetch all matching records by a bunch of ids
     *
     * @param {string} collection
     *
     */
    public async fetchByIds(collection: string, resources: Array<string>) {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .find({
                _id: { $in: resources.map(resource => new ObjectID(resource)) }
            })
            .toArray()
    }

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
    public async destroy(
        collection: string,
        primaryKeys: Array<string>
    ): Promise<any> {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .deleteMany({
                _id: { $in: primaryKeys.map(key => new ObjectID(key)) }
            })
    }

    /**
     *
     * clear a specific collection
     *
     * @param {string} collection
     *
     * @return {Promise}
     *
     */
    public async clear(
        collection: string
    ): Promise<any> {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .deleteMany({})
    }

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
    public async insert(collection: string, data: object) {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .insertOne(data)
    }

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
    public async update(collection: string, primaryKey: string, data: object) {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .findOneAndUpdate({ _id: new ObjectID(primaryKey) }, { $set: data })
    }

    /**
     *
     * Update many existing resources in collection
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
    public async bulkUpdate(
        collection: string,
        primaryKeys: Array<string>,
        data: object
    ) {
        // @ts-ignore
        return this.get()
            .collection(collection)
            .updateMany(
                { _id: primaryKeys.map(key => new ObjectID(key)) },
                { $set: data }
            )
    }
}

export const Connection = new Database()
