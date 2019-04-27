import * as Express from 'express';
declare class ResourceController {
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
    index(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    show: (req: Express.Request, res: Express.Response, expectsJson?: boolean) => Promise<any>;
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
    fetchAll(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    fetch(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    fetchHasOne: (req: Express.Request, res: Express.Response) => Promise<import("express-serve-static-core").Response>;
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
    store(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    update(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    action(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
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
    delete(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
}
export declare const Resource: ResourceController;
export {};
