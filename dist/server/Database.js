"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var mongodb_1 = require("mongodb");
/**
 *
 * This class is in charge of making the database connection
 *
 */
var Database = /** @class */ (function () {
    function Database() {
        /**
         * The database connection
         *
         * @type {Db}
         *
         */
        this.db = null;
    }
    /**
     *
     * Get the database connection
     *
     * @return {Db|null}
     *
     */
    Database.prototype.get = function () {
        return this.db;
    };
    /**
     *
     * Set the database connnection
     *
     * @return {Db|null}
     *
     */
    Database.prototype.set = function (db) {
        this.db = db;
    };
    /**
     * Fetch a single record from a collection
     *
     * @param {string} collection
     *
     * @param {string} primaryKey
     *
     * @return {Promise}
     *
     */
    Database.prototype.find = function (collection, primaryKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .findOne({ _id: new mongodb_1.ObjectID(primaryKey) })];
            });
        });
    };
    /**
     * Fetch all data from a collection
     *
     * @param {string} collection
     *
     * @param {Object} params
     *
     * @return {Promise}
     *
     */
    Database.prototype.fetch = function (collection, params, filter) {
        if (params === void 0) { params = {}; }
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.get()
                                .collection(collection)
                                .find({})
                                .count()];
                    case 1:
                        // @ts-ignore
                        _a.total = _b.sent();
                        return [4 /*yield*/, this.get()
                                .collection(collection)
                                .find(filter)
                                .skip(params.limit * (params.page - 1))
                                .limit(params.limit)
                                .toArray()];
                    case 2: 
                    //  TODO: figure out how to get count and data in one query.
                    return [2 /*return*/, (
                        // @ts-ignore
                        _a.data = _b.sent(),
                            _a)];
                }
            });
        });
    };
    /**
     * Fetch all matching records by a bunch of ids
     *
     * @param {string} collection
     *
     */
    Database.prototype.fetchByIds = function (collection, resources) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .find({
                        _id: { $in: resources.map(function (resource) { return new mongodb_1.ObjectID(resource); }) }
                    })
                        .toArray()];
            });
        });
    };
    /**
     *
     * Delete a specific resource
     *
     * @param {string} collection
     *
     * @param {Array} primaryKeys array of primary keys to be deleted
     *
     * @return {Promise}
     *
     */
    Database.prototype.destroy = function (collection, primaryKeys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .deleteMany({
                        _id: { $in: primaryKeys.map(function (key) { return new mongodb_1.ObjectID(key); }) }
                    })];
            });
        });
    };
    /**
     *
     * Store a new resoruce into collection
     *
     * @param collection
     *
     * @param data
     *
     * @return {Promise}
     *
     */
    Database.prototype.insert = function (collection, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .insertOne(data)];
            });
        });
    };
    /**
     *
     * Update an existing resource in collection
     *
     * @param collection
     *
     * @param primaryKey
     *
     * @param data
     *
     * @return {Promise}
     *
     */
    Database.prototype.update = function (collection, primaryKey, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .findOneAndUpdate({ _id: new mongodb_1.ObjectID(primaryKey) }, { $set: data })];
            });
        });
    };
    /**
     *
     * Update many existing resources in collection
     *
     * @param collection
     *
     * @param primaryKey
     *
     * @param data
     *
     * @return {Promise}
     *
     */
    Database.prototype.bulkUpdate = function (collection, primaryKeys, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                return [2 /*return*/, this.get()
                        .collection(collection)
                        .updateMany({ _id: primaryKeys.map(function (key) { return new mongodb_1.ObjectID(key); }) }, { $set: data })];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
exports.Connection = new Database();
