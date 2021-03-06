import * as Express from 'express';
import { FilterQuery } from 'mongodb';
import { IResource } from '../../../index.d';
declare class ResourceController {
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
    show: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response) => Promise<Express.Response>;
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
    fetchAll(req: Express.Request, res: Express.Response): Promise<Express.Response>;
    /**
     *
     * Build the filter based on query params
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {FilterQuery}
     *
     */
    buildFilter(req: Express.Request, resource?: IResource): FilterQuery<any>;
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
    search: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response) => Promise<Express.Response>;
    getCustomFilters: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, resource: IResource) => (false | ((builder: any) => any))[];
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
    fetch: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response) => Promise<Express.Response>;
    /**
     *
     * Fetch records for a has many relationship
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    fetchHasMany: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response) => Promise<Express.Response>;
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
    fetchHasOne: (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response) => Promise<Express.Response>;
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
    store(req: Express.Request, res: Express.Response): Promise<Express.Response>;
    /**
     *
     * Upload a file for a collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     * TODO: implement a middleware to fetch the validation error for
     * this upload and validate. Also exclude the file
     * validations when creating/updating a
     * resource.
     *
     */
    upload(req: Express.Request, res: Express.Response): Promise<void>;
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
    update(req: Express.Request, res: Express.Response): Promise<Express.Response>;
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
    action(req: Express.Request, res: Express.Response): Promise<Express.Response>;
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
    delete(req: Express.Request, res: Express.Response): Promise<Express.Response>;
    /**
     *
     * Clear all records from specific resource collection
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {Express.Response}
     *
     */
    clear(req: Express.Request, res: Express.Response): Promise<Express.Response>;
    /**
     *
     * This method resolves all computed fields for a resource
     * @param {Array/Object} data
     *
     * @return {Array/Object}
     */
    resolveComputedFields(req: Express.Request, data: any, resource?: IResource): Promise<any>;
}
export declare const Resource: ResourceController;
export {};
