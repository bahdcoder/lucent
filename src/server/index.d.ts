import * as Express from 'express';
import { ITools } from './index.d';
export declare class Lucent {
    /**
     * The path for all resources
     *
     * @type {String}
     *
     */
    private resourcesPath;
    /**
     *
     * Define scripts for Lucent
     *
     * @type {array}
     *
     */
    private static scripts;
    /**
     *
     * Define styles for Lucent
     *
     * @type {array}
     *
     */
    private static styles;
    /**
     *
     * Define the client
     *
     * @type {MongoClient}
     *
     */
    private mongoClient;
    /**
     *
     * Defines the port on which Lucent should run on
     *
     * @type {number}
     *
     */
    private port;
    /**
     *
     * The name of the database
     *
     * @type {string}
     *
     */
    private databaseName;
    /**
     *
     * The database connection
     *
     * @type {Any}
     *
     */
    private connection;
    /**
     *
     * Define the default tools that come
     * with Lucent
     *
     * @type {Array}
     *
     */
    private tools;
    /**
     *
     * The express instance for Lucent
     *
     * @type {Express.Application}
     *
     */
    private expressInstance;
    /**
     * Define the Lucent router
     *
     * @type {Router}
     *
     */
    private router;
    /**
     *
     * Lucent resources
     *
     * @type {Array}
     *
     */
    private resources;
    /**
     * Determine if Lucent has already been initialized
     *
     * @type {Boolean}
     *
     */
    private initialized;
    private jwtSecret;
    /**
     *
     * Define the database connection
     *
     * @type {Database}
     *
     */
    private database;
    /**
     *
     * Initialize Lucent
     *
     */
    constructor();
    /**
     *
     * Set the database client for mongo
     *
     * @param uri set the database uri and database name
     * @param database set the database uri and database name
     *
     * @return {Lucent}
     *
     */
    mongo(uri: string, database: string): this;
    withResourcesPath(resourcesPath: string): this;
    setJwtSecret(jwtSecret: string): this;
    /**
     *
     * We'll loop through all resources, and for each,
     * we'll sync the permissions into the database.
     *
     * We also need to make sure we have the default ADMIN role locked in
     *
     */
    private syncPermissions;
    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    private loadResources;
    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    private getUserResource;
    /**
     *
     * Make the Lucent middleware
     *
     * @return {Function}
     *
     */
    make(): (req: Express.Request<import("express-serve-static-core").ParamsDictionary>, res: Express.Response, next: Express.NextFunction) => void;
    /**
     *
     * Return the Lucent router
     *
     * @return {Express.Router}
     *
     */
    routes(): Express.Router;
    /**
     *
     * Set the port
     *
     * @return {Lucent}
     *
     */
    onPort(port: number): this;
    /**
     *
     * Define the tools to be added to Lucent
     *
     * @return {Lucent}
     *
     */
    withTools(tools: {
        [key: string]: ITools;
    }): Lucent;
    /**
     *
     * Boot all tools for Lucent
     *
     * @return {void}
     *
     */
    bootTools(): void;
    registerAssets(): void;
    /**
     * Start the express server
     *
     * @return {void}
     *
     */
    start(): this | undefined;
}
