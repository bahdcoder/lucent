import * as Fs from 'fs'
import * as Express from 'express'

class RemoveFiles {
    /**
     *
     * Check request to see if there are stale files to remote
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    public static async handle(
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ) {
        if (req.body.staleFiles) {
            try {
                req.body.staleFiles.forEach((file: string) => {
                    Fs.unlinkSync(`${process.cwd()}${file}`)
                })
            } catch (error) {}
        }

        return next()
    }
}

export const RemoveFilesMiddleware = RemoveFiles.handle
