import * as Express from 'express';
declare class SetResource {
    /**
     *
     * Handle create resource validation
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    static handle(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>;
}
export declare const SetResourceMiddleware: typeof SetResource.handle;
export {};
