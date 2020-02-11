import * as Express from 'express'
import { Resource } from './controllers/resource.controller'
import { RemoveFilesMiddleware } from './middleware/remove-files'
import { SetResourceMiddleware } from './middleware/set-resource'
import { CreateResourceValidator } from './middleware/create-resource'

const router = Express.Router()

/**
 *
 * Async wrapper to catch all async errors
 *
 * @param {Function} Fn
 *
 * @return {Function}
 *
 */
const AsyncWrapper = (Fn: Function) => (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) => Fn(req, res, next).catch(next)

/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get(
    '/api/resources/:slug',
    SetResourceMiddleware,
    AsyncWrapper(Resource.fetch)
)

/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get(
    '/api/resources/:slug/all',
    SetResourceMiddleware,
    AsyncWrapper(Resource.fetchAll)
)

/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get(
    '/api/resources/:slug/search',
    SetResourceMiddleware,
    AsyncWrapper(Resource.search)
)

/**
 *
 * Define the route for fetching a single database record for a specific collection/resource
 *
 */
router.get(
    '/api/resources/:slug/:resource',
    SetResourceMiddleware,
    AsyncWrapper(Resource.show)
)

/**
 *
 * Define the route for fetching a single database record related to a specific resource
 *
 */
router.get(
    '/api/resources/:slug/:resource/has-one/:relation',
    SetResourceMiddleware,
    AsyncWrapper(Resource.fetchHasOne)
)

/**
 *
 * Define the route for fetching all related database records related to a specific resource
 *
 */
router.get(
    '/api/resources/:slug/:resource/has-many/:relation',
    SetResourceMiddleware,
    AsyncWrapper(Resource.fetchHasMany)
)

/**
 *
 * Define the route for running a specific action on a list of selected resources
 *
 */
router.post(
    '/api/resources/:slug/run-action',
    SetResourceMiddleware,
    AsyncWrapper(Resource.action)
)

/**
 *
 * Define the route for uploading a file for a collection
 *
 */
router.post(
    '/api/resources/:slug/upload-file',
    SetResourceMiddleware,
    AsyncWrapper(Resource.upload)
)

/**
 *
 * Define the route for updating a single database record for a specific collection/resource
 *
 */
router.put(
    '/api/resources/:slug/:resource',
    SetResourceMiddleware,
    RemoveFilesMiddleware,
    AsyncWrapper(Resource.update)
)

/**
 *
 * Define the route for created a new database record for a specific resource
 *
 */
router.post(
    '/api/resources/:slug',
    SetResourceMiddleware,
    RemoveFilesMiddleware,
    CreateResourceValidator,
    AsyncWrapper(Resource.store)
)

/**
 *
 * Define the route for deleting all specified records for a specific resource
 *
 */
router.delete(
    '/api/resources/:slug',
    SetResourceMiddleware,
    AsyncWrapper(Resource.delete)
)

/**
 *
 * Register these routes only if environment is not production
 *
 */
if (process.env.NODE_ENV !== 'production') {
    router.delete('/api/resources/:slug/clear', AsyncWrapper(Resource.clear))
}

export default router
