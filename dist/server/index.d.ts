import * as Express from 'express';
import { ITools } from './index.d';
export declare class Pangaso {
    /**
     * The path for all resources
     *
     * @type {String}
     *
     */
    private resourcesPath;
    /**
     *
     * Define scripts for pangaso
     *
     * @type {array}
     *
     */
    private static scripts;
    /**
     *
     * Define styles for pangaso
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
     * Defines the port on which pangaso should run on
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
     * with pangaso
     *
     * @type {Array}
     *
     */
    private tools;
    /**
     *
     * The express instance for pangaso
     *
     * @type {Express.Application}
     *
     */
    private expressInstance;
    /**
     * Define the pangaso router
     *
     * @type {Router}
     *
     */
    private router;
    /**
     *
     * Pangaso resources
     *
     * @type {Array}
     *
     */
    private resources;
    /**
     * Determine if pangaso has already been initialized
     *
     * @type {Boolean}
     *
     */
    private initialized;
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
     * Initialize Pangaso
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
     * @return {Pangaso}
     *
     */
    mongo(uri: string, database: string): this;
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
     * Make the pangaso middleware
     *
     * @return {Function}
     *
     */
    make(): (req: Express.Request, res: Express.Response, next: Express.NextFunction) => void;
    /**
     *
     * Return the pangaso router
     *
     * @return {Express.Router}
     *
     */
    routes(): Express.Router;
    /**
     * Register the static assets for pangaso
     *
     * @return {void}
     *
     */
    assets(): import("express-serve-static-core").Handler;
    /**
     *
     * Set the port
     *
     * @return {Pangaso}
     *
     */
    onPort(port: number): this;
    /**
     *
     * Define the tools to be added to Pangaso
     *
     * @return {Pangaso}
     *
     */
    withTools(tools: ITools[]): Pangaso;
    /**
     *
     * Boot all tools for pangaso
     *
     * @return {void}
     *
     */
    bootTools(): void;
    /**
     * Start the express server
     *
     * @return {void}
     *
     */
    start(): this | undefined;
    /**
     * Add scripts to pangaso
     *
     * @return {void}
     *
     */
    static script(name: string, path: string): Pangaso;
    /**
     * Add styles to pangaso
     *
     * @return {void}
     *
     */
    static style(name: string, path: string): Pangaso;
}
