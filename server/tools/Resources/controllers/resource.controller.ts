import { v4 } from 'uuid'
import * as Express from 'express'
import { ObjectID, FilterQuery } from 'mongodb'
import { IResource, IField, IFilter } from '../../../index.d'

class ResourceController {
    /**
     *
     * Get a single record of a resource
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public show = async (req: Express.Request, res: Express.Response) => {
        let resource = await req.lucent.database.find(
            req.lucent.resource.collection(),
            req.params.resource
        )

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        resource = await this.resolveComputedFields(req, resource)

        return res.json(resource)
    }

    /**
     *
     * Fetch all data from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async fetchAll(req: Express.Request, res: Express.Response) {
        const data = await req.lucent.database.fetchAll(
            req.lucent.resource.collection()
        )

        return res.json(data)
    }

    /**
     *
     * Build the filter based on query params
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {FilterQuery}
     *
     */
    public buildFilter(req: Express.Request, resource?: IResource) {
        let filter: FilterQuery<any> = {}

        if (req.query.query) {
            filter = {
                $or: []
            }

            const searchableFields = (resource || req.lucent.resource)
                .fields()
                .filter((field: IField) => field.isSearchable)

            if (searchableFields.length === 0) {
                filter = {}
            } else {
                searchableFields.forEach((field: IField) => {
                    (filter.$or || []).push({
                        [field.attribute]: new RegExp(req.query.query, 'i')
                    })
                })
            }
        }

        return filter
    }

    /**
     *
     * Fetch all data from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public search = async (req: Express.Request, res: Express.Response) => {
        const filter = this.buildFilter(req)

        const data = await req.lucent.database.fetch(
            req.lucent.resource.collection(),
            {
                limit: req.query.per_page || req.lucent.resource.perPage(),
                page: req.query.page || 1
            },
            filter
        )

        return res.json(data)
    }

    getCustomFilters = (req: Express.Request, resource: IResource) =>
        resource
            .filters()
            .map((filter: IFilter) =>
                (req.query.filters || {})[filter.attribute()]
                    ? (builder: any) =>
                          filter.apply(
                              req,
                              builder,
                              (req.query.filters || {})[filter.attribute()]
                          )
                    : false
            )
            .filter(Boolean)

    /**
     *
     * Fetch data from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public fetch = async (req: Express.Request, res: Express.Response) => {
        const filter = this.buildFilter(req)

        const data = await req.lucent.database.fetch(
            req.lucent.resource.collection(),
            {
                limit: req.query.per_page || req.lucent.resource.perPage(),
                page: req.query.page || 1
            },
            filter,
            this.getCustomFilters(req, req.lucent.resource)
        )

        this.resolveComputedFields(req, data.data)

        return res.json(data)
    }

    /**
     *
     * Fetch records for a has many relationship
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public fetchHasMany = async (
        req: Express.Request,
        res: Express.Response
    ) => {
        // we need the resource
        const resource = await req.lucent.database.find(
            req.lucent.resource.collection(),
            req.params.resource
        )

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        // using the resource, let's find it's related field

        const relatedField = req.lucent.resource
            .fields()
            .find((field: IField) => field.attribute === req.params.relation)

        // using the found field, let's find the related resource

        const relatedResource = req.lucent.resources.find(
            (r: IResource) => r.title() === relatedField.resource
        )

        const filter = this.buildFilter(req, relatedResource)

        const data = await req.lucent.database.fetch(
            relatedResource.collection(),
            {
                limit: req.query.per_page || relatedResource.perPage(),
                page: req.query.page || 1
            },
            {
                _id: {
                    $in: (resource[relatedField.attribute] || []).map(
                        (primaryKey: string) => new ObjectID(primaryKey)
                    )
                },
                ...filter
            },
            this.getCustomFilters(req, relatedResource)
        )

        let dataWithComputed = [...data.data]

        dataWithComputed = await this.resolveComputedFields(
            req,
            dataWithComputed,
            relatedResource
        )

        return res.json({
            ...data,
            data: dataWithComputed
        })
    }

    /**
     *
     * Fetch a record for a has one relationship
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public fetchHasOne = async (
        req: Express.Request,
        res: Express.Response
    ) => {
        // we need the resource
        const parentRecord = await req.lucent.database.find(
            req.lucent.resource.collection(),
            req.params.resource
        )

        if (!parentRecord) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        // using the resource, let's find it's related resource
        const relatedField = req.lucent.resource
            .fields()
            .find((field: IField) => field.attribute === req.params.relation)

        const relatedResource = req.lucent.resources.find(
            (r: IResource) => r.name() === relatedField.resource
        )

        let record = null

        if (parentRecord[relatedField.attribute]) {
            record = await req.lucent.database.find(
                relatedResource.collection(),
                parentRecord[relatedField.attribute]
            )
        }

        // Leannon

        if (record) {
            record = await this.resolveComputedFields(
                req,
                record,
                relatedResource
            )
        }

        return res.json(record || null)
    }

    /**
     *
     * Store record for a specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async store(req: Express.Request, res: Express.Response) {
        const data = await req.lucent.resource.beforeInsert(req)

        const resource = await req.lucent.database.insert(
            req.lucent.resource.collection(),
            data
        )

        await req.lucent.resource.afterInsert(req)

        return res.json(resource)
    }

    /**
     *
     * Upload a file for a collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     * TODO: implement a middleware to fetch the validation error for
     * this upload and validate. Also exclude the file
     * validations when creating/updating a
     * resource.
     *
     */
    public async upload(req: Express.Request, res: Express.Response) {
        const id = v4()
        if (req.files && req.files.file) {
            const file: any = req.files.file
            /**
             * TODO: Make sure the `storage` folder is customizable
             *  Also, there should be multiple drivers support for file
             * uploads and storage
             *
             */
            const path = `${process.cwd()}/storage/${id}.${file.name
                .split('.')
                .pop()}`

            file.mv(path, () => {
                return res.json(
                    `/storage/${id}.${file.name.split('.').pop()}`
                )
            })
        }
    }

    /**
     *
     * Update a record for a specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async update(req: Express.Request, res: Express.Response) {
        // const data = await req.lucent.resource.beforeUpdate(req.body)

        const data = req.body

        const { value: parentRecord } = await req.lucent.database.update(
            req.lucent.resource.collection(),
            req.params.resource,
            data
        )

        return res.json(parentRecord)
    }

    /**
     *
     * Run a resource action on a selected list of resources.
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async action(req: Express.Request, res: Express.Response) {
        /**
         *
         * Get the action to be run and selected resources
         *
         */
        const { action: actionId, resources } = req.body

        /**
         *
         * Find the specific action object we are running
         *
         */
        const action = req.lucent.resource
            .actions()
            .find((a: any) => a.id === actionId)

        /**
         *
         * Fetch a collection of all selected resources
         *
         */
        const collection = await req.lucent.database.fetchByIds(
            req.lucent.resource.collection(),
            resources
        )

        /**
         *
         * Run the handle method on the action, passing in
         * the database connection, request object
         * and collection of models
         *
         */
        await action.handle(
            req.lucent.database
                .get()
                .collection(req.lucent.resource.collection()),
            req,
            collection.map((item: any) => ({
                ...item,
                _id: new ObjectID(item._id)
            }))
        )

        /**
         *
         * Resolve and return the message for this action.
         * This could come from the action definition,
         * or a default message from lucent.
         * TODO: Do this.
         *
         */
        return res.json({})
    }

    /**
     *
     * Delete a resource from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async delete(req: Express.Request, res: Express.Response) {
        const data = await req.lucent.database.destroy(
            req.lucent.resource.collection(),
            req.body.resources
        )

        return res.json(data)
    }

    /**
     *
     * Clear all records from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async clear(req: Express.Request, res: Express.Response) {
        await req.lucent.database.clear(req.params.slug)

        return res.json({})
    }

    /**
     *
     * This method resolves all computed fields for a resource
     * @param {Array/Object} data
     *
     * @return {Array/Object}
     */
    public async resolveComputedFields(
        req: Express.Request,
        data: any,
        resource?: IResource
    ) {
        const computedFields = (resource || req.lucent.resource)
            .fields()
            .filter((field: IField) => field.computed)

        // make a real copy of the data so we do not mutate
        const results = Array.isArray(data)
            ? [...data]
            : {
                  ...data
              }

        // first we'll check if it's an array or an object
        if (Array.isArray(results)) {
            // yep, it's a collection of documents

            /**
             *
             * To have some control, let's make this synchronous for now. If it doesn't pose
             * any performance issues then we can make it async
             *
             */
            computedFields.forEach((field: IField) => {
                results.forEach((item: any) => {
                    item[field.attribute] = field.computedResolver(item)
                })
            })

            return results
        }

        // it's a single document

        computedFields.forEach((field: IField) => {
            results[field.attribute] = field.computedResolver(results)
        })

        return results
    }
}

export const Resource = new ResourceController()
