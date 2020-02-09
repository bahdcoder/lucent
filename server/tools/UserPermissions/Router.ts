import * as Express from 'express'

import authMiddleware from './middleware/auth'
import { Auth } from './controllers/auth.controller'

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

router.post('/api/auth/login', Auth.login)

router.get('/api/auth/me', authMiddleware, Auth.me)

export default router
