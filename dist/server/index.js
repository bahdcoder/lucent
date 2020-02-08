"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var Express = require("express");
var Edge = require("express-edge");
var Router_1 = require("./Router");
var Root = require("app-root-path");
var mongodb_1 = require("mongodb");
var BodyParser = require("body-parser");
var Dashboard_1 = require("./tools/Dashboard");
var Resources_1 = require("./tools/Resources");
var Database_1 = require("./Database");
var Lucent = /** @class */ (function () {
    /**
     *
     * Initialize Lucent
     *
     */
    function Lucent() {
        /**
         * The path for all resources
         *
         * @type {String}
         *
         */
        this.resourcesPath = process.cwd() + "/lucent";
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
         * Defines the port on which Lucent should run on
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
         * with Lucent
         *
         * @type {Array}
         *
         */
        this.tools = [new Dashboard_1.Dashboard(), new Resources_1.Resources()];
        /**
         * Define the Lucent router
         *
         * @type {Router}
         *
         */
        this.router = Router_1.default;
        /**
         *
         * Lucent resources
         *
         * @type {Array}
         *
         */
        this.resources = [];
        /**
         * Determine if Lucent has already been initialized
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
         * Make the Lucent application
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
     * @return {Lucent}
     *
     */
    Lucent.prototype.mongo = function (uri, database) {
        this.databaseName = database;
        this.mongoClient = new mongodb_1.MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return this;
    };
    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    Lucent.prototype.loadResources = function () {
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
        catch (error) {
            console.log(error);
        }
    };
    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    Lucent.prototype.getUserResource = function () {
        /**
         *
         * Find a resource called UserResource. This is for
         * cases when authentication is added to
         * the Lucent dashboard.
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
            // throw new Error('User Resource must be defined.')
        }
        return resource;
    };
    /**
     *
     * Make the Lucent middleware
     *
     * @return {Function}
     *
     */
    Lucent.prototype.make = function () {
        var _this = this;
        return function (req, res, next) {
            _this.loadResources();
            req.lucent = {
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
     * Return the Lucent router
     *
     * @return {Express.Router}
     *
     */
    Lucent.prototype.routes = function () {
        return this.router;
    };
    /**
     * Register the static assets for Lucent
     *
     * @return {void}
     *
     */
    Lucent.prototype.assets = function () {
        return Express.static(Path.resolve(__dirname, Root.path, 'public'));
    };
    /**
     *
     * Set the port
     *
     * @return {Lucent}
     *
     */
    Lucent.prototype.onPort = function (port) {
        this.port = port;
        return this;
    };
    /**
     *
     * Define the tools to be added to Lucent
     *
     * @return {Lucent}
     *
     */
    Lucent.prototype.withTools = function (tools) {
        this.tools = __spreadArrays(this.tools, tools);
        return this;
    };
    /**
     *
     * Boot all tools for Lucent
     *
     * @return {void}
     *
     */
    Lucent.prototype.bootTools = function () {
        var _this = this;
        this.tools.forEach(function (tool) { return tool.boot(_this.expressInstance); });
    };
    /**
     * Start the express server
     *
     * @return {void}
     *
     */
    Lucent.prototype.start = function () {
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
         * Register all the tools for Lucent
         *
         *
         */
        this.bootTools();
        /**
         *
         * Register the assets for project
         *
         */
        this.expressInstance.use('/public', this.assets());
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
                console.log("Lucent running on port http://localhost:" + _this.port);
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
     * Add scripts to Lucent
     *
     * @return {void}
     *
     */
    Lucent.script = function (name, path) {
        Lucent.scripts = __spreadArrays(Lucent.scripts, [{ name: name, path: path }]);
        return new Lucent();
    };
    /**
     * Add styles to Lucent
     *
     * @return {void}
     *
     */
    Lucent.style = function (name, path) {
        Lucent.styles = __spreadArrays(Lucent.styles, [{ name: name, path: path }]);
        return new Lucent();
    };
    /**
     *
     * Define scripts for Lucent
     *
     * @type {array}
     *
     */
    Lucent.scripts = [];
    /**
     *
     * Define styles for Lucent
     *
     * @type {array}
     *
     */
    Lucent.styles = [];
    return Lucent;
}());
exports.Lucent = Lucent;
