import * as Express from 'express'
import { IAsset, ITools } from '../index.d'

class ToolController {
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
        return res.json(req.pangaso.tools)
    }
}

export const Tool = new ToolController()
