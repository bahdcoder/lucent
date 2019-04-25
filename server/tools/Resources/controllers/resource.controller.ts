import * as Express from 'express'
import { IResource } from '../../../index.d'

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
    public async show(req: Express.Request, res: Express.Response) {
        const resource = await req.pangaso.database.find(
            req.params.slug,
            req.params.resource
        )

        return res.json(resource)
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
        const data = await req.pangaso.database.fetch(req.params.slug, {
            limit: req.pangaso.resource.perPage(),
            page: req.query.page || 1
        })

        return res.json(data)
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
            req.params.slug,
            data
        )

        return res.json(resource)
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
            req.params.slug,
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
            req.params.slug,
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
            req.pangaso.database.get().collection(req.params.slug),
            req,
            collection
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
            req.params.slug,
            req.body.resources
        )

        return res.json(data)
    }
}

export const Resource = new ResourceController()
