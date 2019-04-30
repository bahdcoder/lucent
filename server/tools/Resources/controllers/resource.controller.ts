import { v4 } from 'uuid'
import * as Express from 'express'
import { ObjectID } from 'mongodb'
import { IResource, IField } from '../../../index.d'

class ResourceController {
    /**
     *
     * Get a list of all resources
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    public async index(req: Express.Request, res: Express.Response) {
        return res.json(
            req.pangaso.resources
                .map((resource: IResource) => resource.serialize())
                .filter((resource: IResource) => resource.authorizedToView)
        )
    }

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
    public show = async (
        req: Express.Request,
        res: Express.Response,
        expectsJson = true
    ) => {
        const resource = await req.pangaso.database.find(
            req.pangaso.resource.collection(),
            req.params.resource
        )

        if (!resource) {
            return expectsJson
                ? res.status(404).json({
                      message: 'Resource not found.'
                  })
                : null
        }

        return expectsJson ? res.json(resource) : resource
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
        const data = await req.pangaso.database.fetchAll(
            req.pangaso.resource.collection()
        )

        return res.json(data)
    }

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
    public async fetch(req: Express.Request, res: Express.Response) {
        const data = await req.pangaso.database.fetch(
            req.pangaso.resource.collection(),
            {
                limit: req.pangaso.resource.perPage(),
                page: req.query.page || 1
            }
        )

        return res.json(data)
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
        const resource = await this.show(req, res, false)

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        // using the resource, let's find it's related resource

        // plan
        const relatedField = req.pangaso.resource
            .fields()
            .find((field: IField) => field.attribute === req.params.relation)

        //
        const relatedResource = req.pangaso.resources.find(
            (r: IResource) => r.name() === relatedField.resource
        )

        const record = await req.pangaso.database.find(
            relatedResource.collection(),
            resource[relatedField.attribute]
        )

        return res.json(record || {})
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
        const data = await req.pangaso.resource.beforeSave(req.body)

        const resource = await req.pangaso.database.insert(
            req.pangaso.resource.collection(),
            data
        )

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
     */
    public async upload(req: Express.Request, res: Express.Response) {
        const id = v4()
        if (req.files && req.files.file) {
            const file: any = req.files.file
            const path = `${process.cwd()}/pangaso-storage/${id}.${file.name
                .split('.')
                .pop()}`

            file.mv(path, () => {
                return res.json(
                    `/pangaso-storage/${id}.${file.name.split('.').pop()}`
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
        const data = await req.pangaso.resource.beforeUpdate(req.body)

        const resource = await req.pangaso.database.update(
            req.pangaso.resource.collection(),
            req.params.resource,
            data
        )

        return res.json(resource)
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
        const action = req.pangaso.resource
            .actions()
            .find((a: any) => a.id === actionId)

        /**
         *
         * Fetch a collection of all selected resources
         *
         */
        const collection = await req.pangaso.database.fetchByIds(
            req.pangaso.resource.collection(),
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
            req.pangaso.database
                .get()
                .collection(req.pangaso.resource.collection()),
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
         * or a default message from pangaso.
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
        const data = await req.pangaso.database.destroy(
            req.pangaso.resource.collection(),
            req.body.resources
        )

        return res.json(data)
    }
}

export const Resource = new ResourceController()
