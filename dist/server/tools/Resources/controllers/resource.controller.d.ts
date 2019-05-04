import * as Express from 'express';
import { FilterQuery } from 'mongodb';
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
     * Build the filter based on query params
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     * @return {FilterQuery}
     *
     */
    buildFilter(req: Express.Request, res: Express.Response): FilterQuery<any>;
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
    search: (req: Express.Request, res: Express.Response) => Promise<import("express-serve-static-core").Response>;
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
    fetch: (req: Express.Request, res: Express.Response) => Promise<import("express-serve-static-core").Response>;
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
    fetchHasMany: (req: Express.Request, res: Express.Response) => Promise<import("express-serve-static-core").Response>;
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
    clear(req: Express.Request, res: Express.Response): Promise<import("express-serve-static-core").Response>;
}
export declare const Resource: ResourceController;
export {};
