import * as path from 'path'
import * as Edge from 'edge.js'
import * as Express from 'express'
import * as Root from 'app-root-path'
import { IResource } from './index.d'
import { Tool } from './controllers/tool.controller'

const router = Express.Router()

/**
 *
 * Define the api resources
 *
 */
router.get('/api/tools', Tool.index)

/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get('*', (req: Express.Request, res: Express.Response): void =>
    res.render('index', {
        tools: req.lucent.tools,
        resources: JSON.stringify(
            req.lucent.resources.map((resource: IResource) =>
                resource.serialize()
            )
        )
    })
)

export default router
