import * as Fs from 'fs'
import * as Path from 'path'
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

const auth = (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) => {
    return next()
}

/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get('*', async (req: Express.Request, res: Express.Response) => {
    const template = Fs.readFileSync(
        Path.join(__dirname, '..', '/client/public/index.edge')
    ).toString()

    const fileContent = Edge.renderString(template, {
        tools: req.lucent.tools,
        // @ts-ignore
        resources: req.session.user
            ? JSON.stringify(
                  req.lucent.resources.map((resource: IResource) =>
                      // @ts-ignore
                      resource.serialize(req.session.user)
                  )
              )
            : [],
        user: req.session ? JSON.stringify(req.session.user) : ''
    })

    res.send(fileContent)
})

export default router
