import * as Express from 'express';
import { IResource } from '../../../index.d';
declare class CreateResource {
    /**
     *
     * Handle create resource validation
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    static handle(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void | Express.Response>;
    /**
     *
     * Loop through all fields for a resource and build validation rules
     *
     * @param {IResource}
     *
     * @return {object}
     *
     */
    static buildValidationRules(resource: IResource): any;
    /**
     *
     * Define custom validation messages
     *
     * @return {Object}
     *
     */
    static customMessages(): object;
}
export declare const CreateResourceValidator: typeof CreateResource.handle;
export {};
