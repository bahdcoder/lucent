import { v4 } from 'uuid'
import * as Express from 'express'
import { ObjectID, FilterQuery } from 'mongodb'
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
    public show = async (req: Express.Request, res: Express.Response) => {
        const resource = await req.pangaso.database.find(
            req.pangaso.resource.collection(),
            req.params.resource
        )

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

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
        const data = await req.pangaso.database.fetchAll(
            req.pangaso.resource.collection()
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

            const searchableFields = (resource || req.pangaso.resource)
                .fields()
                .filter((field: IField) => field.isSearchable)

            searchableFields.forEach((field: IField) => {
                filter.$or.push({
                    [field.attribute]: new RegExp(req.query.query, 'i')
                })
            })
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

        const data = await req.pangaso.database.fetch(
            req.pangaso.resource.collection(),
            {
                limit: req.pangaso.resource.perPage(),
                page: req.query.page || 1
            },
            filter
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
    public fetch = async (req: Express.Request, res: Express.Response) => {
        const filter = this.buildFilter(req)

        const data = await req.pangaso.database.fetch(
            req.pangaso.resource.collection(),
            {
                limit: req.pangaso.resource.perPage(),
                page: req.query.page || 1
            },
            filter
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
        const resource = await req.pangaso.database.find(
            req.pangaso.resource.collection(),
            req.params.resource
        )

        if (!resource) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        // using the resource, let's find it's related resource

        const relatedField = req.pangaso.resource
            .fields()
            .find((field: IField) => field.attribute === req.params.relation)

        // using the found field, let's find the related resource

        const relatedResource = req.pangaso.resources.find(
            (r: IResource) => r.title() === relatedField.resource
        )

        const filter = this.buildFilter(req, relatedResource)

        const data = await req.pangaso.database.fetch(
            relatedResource.collection(),
            {
                limit: relatedResource.perPage(),
                page: req.query.page || 1
            },
            {
                _id: {
                    $in: (resource[relatedField.attribute] || []).map(
                        (primaryKey: string) => new ObjectID(primaryKey)
                    )
                },
                ...filter
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
        const parentRecord = await req.pangaso.database.find(
            req.pangaso.resource.collection(),
            req.params.resource
        )

        if (!parentRecord) {
            return res.status(404).json({
                message: 'Resource not found.'
            })
        }

        // using the resource, let's find it's related resource
        const relatedField = req.pangaso.resource
            .fields()
            .find((field: IField) => field.attribute === req.params.relation)

        const relatedResource = req.pangaso.resources.find(
            (r: IResource) => r.name() === relatedField.resource
        )

        const record = await req.pangaso.database.find(
            relatedResource.collection(),
            parentRecord[relatedField.attribute]
        )

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
             * TODO: Make sure the `pangaso-storage` folder is customizable
             *  Also, there should be multiple drivers support for file
             * uploads and storage
             * 
             */
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
        // const data = await req.pangaso.resource.beforeUpdate(req.body)

        const data = req.body

        const { value: parentRecord } = await req.pangaso.database.update(
            req.pangaso.resource.collection(),
            req.params.resource,
            data
        )

        // Here, we'll check if there's a has-one relationship
        const hasOneRelationships = req.pangaso.resource
            .fields()
            .filter((field: IField) => field.type === 'HasOne')

        for (let index = 0; index < hasOneRelationships.length; index++) {
            const hasOneField = hasOneRelationships[index]

            // get the related resource.
            const relatedResource = req.pangaso.resources.find(
                (r: IResource) => r.name() === hasOneField.resource
            )

            // try to find a reverse related has-one/has-many relationship
            const reverseRelationshipField = relatedResource
                .fields()
                .find(
                    (field: IField) =>
                        field.resource === req.pangaso.resource.title()
                )

            // if this field wasn't even updated, let's quit this whole process now.
            // TODO: <---------

            // if a relationship was found
            if (reverseRelationshipField) {
                // if the found relationship is a HasMany relationship,
                // we'll have to do a sync. if this updated record id
                // is already owned by the HaSMany related resource
                // then we'll remove it. if it's not, then we'll
                // add it.
                if (reverseRelationshipField.type === 'HasMany') {
                    // Here, we'll find the related has-many record
                    const relatedParentRecord = await req.pangaso.database.find(
                        relatedResource.collection(),
                        parentRecord[hasOneField.attribute]
                    )

                    // if the record is found, it's time to perform the
                    // sync and update
                    if (relatedParentRecord) {
                        let updatedRelatedResources =
                            relatedParentRecord[
                                reverseRelationshipField.attribute
                            ]
                        let original =
                            relatedParentRecord[
                                reverseRelationshipField.attribute
                            ] || []

                        console.log('-->', relatedParentRecord[
                            relatedResource.primaryKey()
                        ], parentRecord[hasOneField.attribute])

                        // Let's check if the user updated the related has-one field
                        if (
                            original.includes(
                                parentRecord[req.pangaso.resource.primaryKey()]
                            ) &&
                            parentRecord[hasOneField.attribute] !==
                                relatedParentRecord[
                                    relatedResource.primaryKey()
                                ]
                        ) {
                            console.log('-----------------> UPDATING DATA',  (
                                relatedParentRecord[
                                    reverseRelationshipField.attribute
                                ] || []
                            ).filter(
                                (i: string) =>
                                    i !==
                                    parentRecord[
                                        req.pangaso.resource.primaryKey()
                                    ]
                            ))
                            // remove it from the old relatedParent
                            await req.pangaso.database.update(
                                relatedResource.collection(),
                                relatedParentRecord[
                                    relatedResource.primaryKey()
                                ],
                                {
                                    [reverseRelationshipField.attribute]: (
                                        relatedParentRecord[
                                            reverseRelationshipField.attribute
                                        ] || []
                                    ).filter(
                                        (i: string) =>
                                            i !==
                                            parentRecord[
                                                req.pangaso.resource.primaryKey()
                                            ]
                                    )
                                }
                            )
                        }

                        if (
                            !original.includes(
                                parentRecord[req.pangaso.resource.primaryKey()]
                            ) &&
                            parentRecord[hasOneField.attribute] !==
                                relatedParentRecord[
                                    relatedResource.primaryKey()
                                ]
                        ) {
                            // fetch the newly related parent and add this parentRecord to it's has-many array.
                        }

                        // if (original.includes(
                        //     parentRecord[req.pangaso.resource.primaryKey()]
                        // )) {
                        //     updatedRelatedResources = original.filter((i: string) => i !== parentRecord[req.pangaso.resource.primaryKey()])
                        // }
                    }
                }
            }
        }

        // Here, we'll check if there's a has-many relationship
        const hasManyRelationships = req.pangaso.resource
            .fields()
            .filter((field: IField) => field.type === 'HasMany')

        // if there is, we'll check if there's a reverse has-one/has-many relationship
        for (let index = 0; index < hasManyRelationships.length; index++) {
            const hasManyField = hasManyRelationships[index]

            // get the related resource.
            const relatedResource = req.pangaso.resources.find(
                (r: IResource) => r.title() === hasManyField.resource
            )

            // try to find a reverse related has-one/has-many relationship
            const reverseRelationshipField = relatedResource
                .fields()
                .find(
                    (field: IField) =>
                        field.name === req.pangaso.resource.name()
                )

            // if a relationship was found
            if (reverseRelationshipField) {
                // if the found relationship is a Has-One relationship
                // we'll findAndUpdate the related record with
                // the parent value
                if (reverseRelationshipField.type === 'HasOne') {
                    // We are going to perform a full sync of the two resources
                    // in the database.

                    // First, we'll remove all of the old ones
                    await req.pangaso.database.bulkUpdate(
                        relatedResource.collection(),
                        parentRecord[hasManyField.attribute],
                        {
                            [reverseRelationshipField.attribute]: null
                        }
                    )

                    // Next, we'll update

                    // Next, we'll run this query to populate the new ones that were selected by user
                    await req.pangaso.database.bulkUpdate(
                        relatedResource.collection(),
                        data[hasManyField.attribute],
                        {
                            [reverseRelationshipField.attribute]:
                                parentRecord[req.pangaso.resource.primaryKey()]
                        }
                    )
                }

                if (reverseRelationshipField.type === 'HasMany') {
                    // TODO: Add support for has many updates.
                }
            }
            // try to find a reverse related has-many relationship
        }
        // if there is, then we'll automatically populate the related models.

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
        await req.pangaso.database.clear(req.params.slug)

        return res.json({})
    }

    /**
     * 
     * This method 
     */
    public async resolveComputedFieldForDocument() {}

    /**
     * 
     * This method resolves all computed fields for a resource
     * @param {Array/Object} data
     * 
     * @return {Array/Object}
     */
    public async resolveComputedFields(req: Express.Request, data: any) {
        const computedFields = req.pangaso.resource.fields().filter((field: IField) => field.computed)

        // first we'll check if it's an array or an object
        if (Array.isArray(data)) {
            // yep, it's a collection of documents

            /**
             * 
             * To have some control, let's make this synchronous for now. If it doesn't pose
             * any performance issues then we can make it async
             * 
             */
            computedFields.forEach((field: IField) => {
                data.forEach((item: any) => {
                    item[field.attribute] = field.computedResolver(item)
                })
            })

            return data
        }

        // it's a single document
        return data
    }
}

export const Resource = new ResourceController()
