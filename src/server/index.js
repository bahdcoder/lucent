"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var Redis = require("redis");
var Express = require("express");
var Router_1 = require("./Router");
var Root = require("app-root-path");
var mongodb_1 = require("mongodb");
var BodyParser = require("body-parser");
var ConnectRedis = require("connect-redis");
var Dashboard_1 = require("./tools/Dashboard");
var Resources_1 = require("./tools/Resources");
var ExpressSession = require("express-session");
var Database_1 = require("./Database");
var UserPermissions_1 = require("./tools/UserPermissions");
var User_1 = require("./tools/UserPermissions/Resources/User");
var Role_1 = require("./tools/UserPermissions/Resources/Role");
var Permission_1 = require("./tools/UserPermissions/Resources/Permission");
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
        this.tools = {
            'dashboard': new Dashboard_1.Dashboard(),
            'resources': new Resources_1.Resources(),
            'user-permissions': new UserPermissions_1.UserPermissions()
        };
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
        this.resources = [new User_1.User(), new Role_1.Role(), new Permission_1.Permission()];
        /**
         * Determine if Lucent has already been initialized
         *
         * @type {Boolean}
         *
         */
        this.initialized = false;
        this.jwtSecret = process.env.JWT_SECRET || 'TEMPORAL_JWT_SECRET';
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
        var RedisStore = ConnectRedis(ExpressSession);
        this.expressInstance.use(ExpressSession({
            store: new RedisStore({ client: Redis.createClient({}) }),
            secret: process.env.SESSION_KEY || 'TEMPORAL_SESSION_KEY',
            saveUninitialized: false,
            resave: false
        }));
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
    Lucent.prototype.withResourcesPath = function (resourcesPath) {
        this.resourcesPath = resourcesPath;
        return this;
    };
    Lucent.prototype.setJwtSecret = function (jwtSecret) {
        this.jwtSecret = jwtSecret;
        return this;
    };
    /**
     *
     * We'll loop through all resources, and for each,
     * we'll sync the permissions into the database.
     *
     * We also need to make sure we have the default ADMIN role locked in
     *
     */
    Lucent.prototype.syncPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissionResource, roleResource, adminRole, index, resource, permissions, index_1, permission, permissionInDatabase, permissionsInDatabase, permissionsToBeDeleted, flattenedPermissions, index, permission, _loop_1, this_1, index, allPermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        permissionResource = this.resources.find(function (resource) { return resource.name() === 'Permission'; });
                        roleResource = this.resources.find(function (resource) { return resource.name() === 'Role'; });
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(roleResource.collection())
                                .findOne({
                                name: 'admin'
                            })];
                    case 1:
                        adminRole = _a.sent();
                        if (!!adminRole) return [3 /*break*/, 4];
                        // @ts-ignore
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(roleResource.collection())
                                .insertOne({
                                name: 'admin',
                                permissions: []
                            })
                            // @ts-ignore
                        ];
                    case 2:
                        // @ts-ignore
                        _a.sent();
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(roleResource.collection())
                                .findOne({
                                name: 'admin'
                            })];
                    case 3:
                        // @ts-ignore
                        adminRole = _a.sent();
                        _a.label = 4;
                    case 4:
                        index = 0;
                        _a.label = 5;
                    case 5:
                        if (!(index < this.resources.length)) return [3 /*break*/, 11];
                        resource = this.resources[index];
                        permissions = resource.permissions();
                        index_1 = 0;
                        _a.label = 6;
                    case 6:
                        if (!(index_1 < permissions.length)) return [3 /*break*/, 10];
                        permission = permissions[index_1];
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(permissionResource.collection())
                                .findOne({
                                slug: permission
                            })];
                    case 7:
                        permissionInDatabase = _a.sent();
                        if (!!permissionInDatabase) return [3 /*break*/, 9];
                        // @ts-ignore
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(permissionResource.collection())
                                .insertOne({
                                slug: permission
                            })];
                    case 8:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        index_1++;
                        return [3 /*break*/, 6];
                    case 10:
                        index++;
                        return [3 /*break*/, 5];
                    case 11: return [4 /*yield*/, this.database.fetchAll(permissionResource.collection())];
                    case 12:
                        permissionsInDatabase = _a.sent();
                        permissionsToBeDeleted = [];
                        flattenedPermissions = [];
                        this.resources.forEach(function (resource) {
                            flattenedPermissions = flattenedPermissions.concat(resource.permissions());
                        });
                        for (index = 0; index < permissionsInDatabase.length; index++) {
                            permission = permissionsInDatabase[index];
                            if (!flattenedPermissions.includes(permission.slug)) {
                                permissionsToBeDeleted.push(permission._id);
                            }
                        }
                        _loop_1 = function (index) {
                            var permission, rolesWithPermission, index_2, role;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        permission = permissionsToBeDeleted[index];
                                        return [4 /*yield*/, this_1.database
                                                .get()
                                                .collection(roleResource.collection())
                                                .find({
                                                permissions: permission.toString()
                                            })
                                                .toArray()
                                            // run update on these found roles
                                        ];
                                    case 1:
                                        rolesWithPermission = _a.sent();
                                        index_2 = 0;
                                        _a.label = 2;
                                    case 2:
                                        if (!(index_2 < rolesWithPermission.length)) return [3 /*break*/, 5];
                                        role = rolesWithPermission[index_2];
                                        // @ts-ignore
                                        return [4 /*yield*/, this_1.database
                                                .get()
                                                .collection(roleResource.collection())
                                                .findOneAndUpdate({
                                                _id: role._id.toString()
                                            }, {
                                                $set: {
                                                    permissions: role.permissions.filter(function (p) { return p !== permission.toString(); })
                                                }
                                            })];
                                    case 3:
                                        // @ts-ignore
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        index_2++;
                                        return [3 /*break*/, 2];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        index = 0;
                        _a.label = 13;
                    case 13:
                        if (!(index < permissionsToBeDeleted.length)) return [3 /*break*/, 16];
                        return [5 /*yield**/, _loop_1(index)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        index++;
                        return [3 /*break*/, 13];
                    case 16: 
                    // @ts-ignore
                    return [4 /*yield*/, this.database.destroy(permissionResource.collection(), permissionsToBeDeleted)
                        // @ts-ignore
                    ];
                    case 17:
                        // @ts-ignore
                        _a.sent();
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(permissionResource.collection())
                                .find({})
                                .toArray()
                            // @ts-ignore
                        ];
                    case 18:
                        allPermissions = _a.sent();
                        // @ts-ignore
                        return [4 /*yield*/, this.database
                                .get()
                                .collection(roleResource.collection())
                                .findOneAndUpdate({
                                _id: adminRole._id.toString()
                            }, {
                                $set: {
                                    permissions: allPermissions.map(function (permission) {
                                        return permission._id.toString();
                                    })
                                }
                            })];
                    case 19:
                        // @ts-ignore
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
                jwtSecret: _this.jwtSecret,
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
        this.tools = __assign(__assign({}, this.tools), tools);
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
        Object.keys(this.tools).forEach(function (tool) { return _this.tools[tool].boot(_this.expressInstance); });
    };
    Lucent.prototype.registerAssets = function () {
        this.expressInstance.get('/lucent/public/css/custom.css', function (request, response) {
            return response.sendFile(Path.join(__dirname, '..', '/client/public/css/custom.css'));
        });
        this.expressInstance.get('/lucent/public/css/app.css', function (request, response) {
            return response.sendFile(Path.join(__dirname, '..', '/client/public/css/app.css'));
        });
        this.expressInstance.get('/lucent/public/js/app.js', function (request, response) {
            return response.sendFile(Path.join(__dirname, '..', '/client/public/js/app.js'));
        });
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
        this.registerAssets();
        /**
         *
         * Set the root path for views
         *
         */
        this.expressInstance.set('views', Path.resolve(__dirname, Root.path, 'src/client/public'));
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
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //@ts-ignore
                        this.database.set(this.mongoClient.db(this.databaseName));
                        return [4 /*yield*/, this.syncPermissions()];
                    case 1:
                        _a.sent();
                        this.expressInstance.listen(this.port, function () {
                            console.log("Lucent running on port http://localhost:" + _this.port);
                        });
                        return [2 /*return*/];
                }
            });
        }); })
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
