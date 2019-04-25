"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var Express = require("express");
var Edge = require("express-edge");
var Router_1 = require("./Router");
var Root = require("app-root-path");
var mongodb_1 = require("mongodb");
var BodyParser = require("body-parser");
var Resources_1 = require("./tools/Resources");
var Database_1 = require("./Database");
var Pangaso = /** @class */ (function () {
    /**
     *
     * Initialize Pangaso
     *
     */
    function Pangaso() {
        /**
         * The path for all resources
         *
         * @type {String}
         *
         */
        this.resourcesPath = process.cwd() + "/pangaso";
        /**
         *
         * Define the client
         *
         * @type {MongoClient}
         *
         */
        this.mongoClient = null;
        /**
         *
         * Defines the port on which pangaso should run on
         *
         * @type {number}
         *
         */
        this.port = null;
        /**
         *
         * The name of the database
         *
         * @type {string}
         *
         */
        this.databaseName = '';
        /**
         *
         * The database connection
         *
         * @type {Any}
         *
         */
        this.connection = '';
        /**
         *
         * Define the default tools that come
         * with pangaso
         *
         * @type {Array}
         *
         */
        this.tools = [new Resources_1.Resources()];
        /**
         * Define the pangaso router
         *
         * @type {Router}
         *
         */
        this.router = Router_1.default;
        /**
         *
         * Pangaso resources
         *
         * @type {Array}
         *
         */
        this.resources = [];
        /**
         * Determine if pangaso has already been initialized
         *
         * @type {Boolean}
         *
         */
        this.initialized = false;
        /**
         *
         * Define the database connection
         *
         * @type {Database}
         *
         */
        this.database = Database_1.Connection;
        /**
         *
         * Initialize express instance
         *
         */
        this.expressInstance = Express();
        /**
         *
         * Register the body parser middleware
         *
         */
        this.expressInstance.use(BodyParser.json());
        /**
         *
         * Make the pangaso application
         *
         */
        this.expressInstance.use(this.make());
    }
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
    Pangaso.prototype.mongo = function (uri, database) {
        this.databaseName = database;
        this.mongoClient = new mongodb_1.MongoClient(uri, { useNewUrlParser: true });
        return this;
    };
    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    Pangaso.prototype.loadResources = function () {
        var _this = this;
        if (this.initialized)
            return;
        this.initialized = true;
        try {
            /**
             *
             * Fetch all files (and unfortunately, folders) in resource path
             *
             */
            var files = Fs.readdirSync(this.resourcesPath);
            /**
             *
             * Get only files ending in .js
             *
             */
            files = files.filter(function (file) { return file.substring(file.length - 3) === '.js'; });
            /**
             *
             * Foreach of those files, require and load the resource
             *
             */
            files.forEach(function (file) {
                /**
                 *
                 * Require the resource export
                 *
                 */
                var resource = require(_this.resourcesPath + "/" + file);
                /**
                 * Create and push a new instance of the resource.
                 * This adds support for resources exported
                 * using the ES6 import/export syntax.
                 *
                 */
                if (resource.default) {
                    return _this.resources.push(new resource.default());
                }
                /**
                 *
                 * Create and push a new instance of a resource
                 *
                 */
                _this.resources.push(new resource());
            });
        }
        catch (error) { }
    };
    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    Pangaso.prototype.getUserResource = function () {
        /**
         *
         * Find a resource called UserResource. This is for
         * cases when authentication is added to
         * the pangaso dashboard.
         *
         */
        var resource = this.resources.find(function (resource) {
            if (resource && resource.name) {
                return resource.name() === 'User';
            }
            return false;
        });
        /**
         *
         * Only throw this error if authentication is turned on
         * but a user resource is not defined
         *
         */
        if (!resource) {
            throw new Error('User Resource must be defined.');
        }
        return resource;
    };
    /**
     *
     * Make the pangaso middleware
     *
     * @return {Function}
     *
     */
    Pangaso.prototype.make = function () {
        var _this = this;
        return function (req, res, next) {
            _this.loadResources();
            req.pangaso = {
                tools: _this.tools,
                router: _this.router,
                database: _this.database,
                resources: _this.resources,
                userResource: _this.getUserResource()
            };
            next();
        };
    };
    /**
     *
     * Return the pangaso router
     *
     * @return {Express.Router}
     *
     */
    Pangaso.prototype.routes = function () {
        return this.router;
    };
    /**
     * Register the static assets for pangaso
     *
     * @return {void}
     *
     */
    Pangaso.prototype.assets = function () {
        return Express.static(Path.resolve(__dirname, Root.path, 'public'));
    };
    /**
     *
     * Set the port
     *
     * @return {Pangaso}
     *
     */
    Pangaso.prototype.onPort = function (port) {
        this.port = port;
        return this;
    };
    /**
     *
     * Define the tools to be added to Pangaso
     *
     * @return {Pangaso}
     *
     */
    Pangaso.prototype.withTools = function (tools) {
        this.tools = this.tools.concat(tools);
        return this;
    };
    /**
     *
     * Boot all tools for pangaso
     *
     * @return {void}
     *
     */
    Pangaso.prototype.bootTools = function () {
        var _this = this;
        this.tools.forEach(function (tool) { return tool.boot(_this.expressInstance); });
    };
    /**
     * Start the express server
     *
     * @return {void}
     *
     */
    Pangaso.prototype.start = function () {
        var _this = this;
        if (!this.mongoClient) {
            return this;
        }
        if (!this.port) {
            return this;
        }
        /**
         *
         *
         * Register all the tools for pangaso
         *
         *
         */
        this.bootTools();
        /**
         *
         * Register the assets for project
         *
         */
        this.expressInstance.use('/pangaso-assets', this.assets());
        /**
         *
         * Register the edge templating engine
         *
         */
        this.expressInstance.use(Edge);
        /**
         *
         * Set the root path for views
         *
         */
        this.expressInstance.set('views', Path.resolve(__dirname, Root.path, 'public'));
        /**
         *
         * Register the express routes
         *
         */
        this.expressInstance.use(this.routes());
        /**
         *
         * Connect to the mongo client
         *
         */
        this.mongoClient
            .connect()
            /**
             *
             * After connected successfully, start
             * express server
             *
             */
            .then(function () {
            //@ts-ignore
            _this.database.set(_this.mongoClient.db(_this.databaseName));
            _this.expressInstance.listen(_this.port, function () {
                console.log("Pangaso running on port http://localhost:" + _this.port);
            });
        })
            /**
             *
             * Handle any errors from connecting to database
             * or starting the server
             *
             */
            .catch(function (error) {
            console.error(error);
        });
    };
    /**
     * Add scripts to pangaso
     *
     * @return {void}
     *
     */
    Pangaso.script = function (name, path) {
        Pangaso.scripts = Pangaso.scripts.concat([{ name: name, path: path }]);
        return new Pangaso();
    };
    /**
     * Add styles to pangaso
     *
     * @return {void}
     *
     */
    Pangaso.style = function (name, path) {
        Pangaso.styles = Pangaso.styles.concat([{ name: name, path: path }]);
        return new Pangaso();
    };
    /**
     *
     * Define scripts for pangaso
     *
     * @type {array}
     *
     */
    Pangaso.scripts = [];
    /**
     *
     * Define styles for pangaso
     *
     * @type {array}
     *
     */
    Pangaso.styles = [];
    return Pangaso;
}());
exports.Pangaso = Pangaso;
