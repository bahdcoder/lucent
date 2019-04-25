import * as Express from 'express';
import { IResource } from '../index.d';
export declare class Action {
    /**
     *
     * Determines if this action is destructive
     *
     * @type {Boolean}
     *
     */
    isDestructive: Boolean;
    /**
     * The Identifier of the action
     *
     * @type {string}
     *
     */
    private id;
    /**
     *
     * Define the name of this action. Will be displayed
     * on the resource index page.
     *
     * @type {String}
     *
     */
    name: string;
    /**
     * Define the method to handle this action
     *
     * @param {object} databaseConnection the connection to the specific
     * resource this action will be performed on
     *
     * @param {Express.Request} currentRequest the current express request object
     * which contains the authenticated user, body, etc
     *
     * @param {array[IResource]} resources an array of all selected resources from the
     * frontend selected by user
     *
     * @return {Promise}
     *
     */
    handle(databaseConnection: any, request: Express.Request, resources: [IResource]): Promise<any>;
    /**
     *
     * Determine if this action is destructive
     *
     * @return {Action}
     *
     */
    destructive(destructive?: boolean): this;
    /**
     *
     * Define an alternate name for this action
     *
     * @return {Action}
     *
     */
    as(name: string): this;
    /**
     *
     * Fields used to collect data from user on frontend
     *
     * @return {Array}
     *
     */
    fields(): never[];
    /**
     *
     * Serialize this action
     *
     * @return {Action}
     *
     */
    serialize(): {
        id: string;
        name: string;
        fiels: never[];
        isDestructive: Boolean;
    };
}
