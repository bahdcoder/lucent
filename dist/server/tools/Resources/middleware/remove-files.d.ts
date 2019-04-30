import * as Express from 'express';
declare class RemoveFiles {
    /**
     *
     * Check request to see if there are stale files to remote
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    static handle(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>;
}
export declare const RemoveFilesMiddleware: typeof RemoveFiles.handle;
export {};
