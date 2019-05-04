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
var uuid_1 = require("uuid");
var mongodb_1 = require("mongodb");
var ResourceController = /** @class */ (function () {
    function ResourceController() {
        var _this = this;
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
        this.show = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.find(req.pangaso.resource.collection(), req.params.resource)];
                    case 1:
                        resource = _a.sent();
                        if (!resource) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Resource not found.'
                                })];
                        }
                        return [2 /*return*/, res.json(resource)];
                }
            });
        }); };
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
        this.search = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filter, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.buildFilter(req);
                        return [4 /*yield*/, req.pangaso.database.fetch(req.pangaso.resource.collection(), {
                                limit: req.pangaso.resource.perPage(),
                                page: req.query.page || 1
                            }, filter)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        }); };
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
        this.fetch = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filter, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.buildFilter(req);
                        return [4 /*yield*/, req.pangaso.database.fetch(req.pangaso.resource.collection(), {
                                limit: req.pangaso.resource.perPage(),
                                page: req.query.page || 1
                            }, filter)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        }); };
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
        this.fetchHasMany = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var resource, relatedField, relatedResource, filter, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.find(req.pangaso.resource.collection(), req.params.resource)];
                    case 1:
                        resource = _a.sent();
                        if (!resource) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Resource not found.'
                                })];
                        }
                        relatedField = req.pangaso.resource
                            .fields()
                            .find(function (field) { return field.attribute === req.params.relation; });
                        relatedResource = req.pangaso.resources.find(function (r) { return r.title() === relatedField.resource; });
                        filter = this.buildFilter(req, relatedResource);
                        return [4 /*yield*/, req.pangaso.database.fetch(relatedResource.collection(), {
                                limit: relatedResource.perPage(),
                                page: req.query.page || 1
                            }, __assign({ _id: {
                                    $in: (resource[relatedField.attribute] || []).map(function (primaryKey) { return new mongodb_1.ObjectID(primaryKey); })
                                } }, filter))];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        }); };
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
        this.fetchHasOne = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var parentRecord, relatedField, relatedResource, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.find(req.pangaso.resource.collection(), req.params.resource)];
                    case 1:
                        parentRecord = _a.sent();
                        if (!parentRecord) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Resource not found.'
                                })];
                        }
                        relatedField = req.pangaso.resource
                            .fields()
                            .find(function (field) { return field.attribute === req.params.relation; });
                        relatedResource = req.pangaso.resources.find(function (r) { return r.name() === relatedField.resource; });
                        return [4 /*yield*/, req.pangaso.database.find(relatedResource.collection(), parentRecord[relatedField.attribute])];
                    case 2:
                        record = _a.sent();
                        return [2 /*return*/, res.json(record || null)];
                }
            });
        }); };
    }
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
    ResourceController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json(req.pangaso.resources
                        .map(function (resource) { return resource.serialize(); })
                        .filter(function (resource) { return resource.authorizedToView; }))];
            });
        });
    };
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
    ResourceController.prototype.fetchAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.fetchAll(req.pangaso.resource.collection())];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
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
    ResourceController.prototype.buildFilter = function (req, resource) {
        var filter = {};
        if (req.query.query) {
            filter = {
                $or: []
            };
            var searchableFields = (resource || req.pangaso.resource)
                .fields()
                .filter(function (field) { return field.isSearchable; });
            searchableFields.forEach(function (field) {
                var _a;
                filter.$or.push((_a = {},
                    _a[field.attribute] = new RegExp(req.query.query, 'i'),
                    _a));
            });
        }
        return filter;
    };
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
    ResourceController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.resource.beforeSave(req.body)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, req.pangaso.database.insert(req.pangaso.resource.collection(), data)];
                    case 2:
                        resource = _a.sent();
                        return [2 /*return*/, res.json(resource)];
                }
            });
        });
    };
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
    ResourceController.prototype.upload = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, file_1, path;
            return __generator(this, function (_a) {
                id = uuid_1.v4();
                if (req.files && req.files.file) {
                    file_1 = req.files.file;
                    path = process.cwd() + "/pangaso-storage/" + id + "." + file_1.name
                        .split('.')
                        .pop();
                    file_1.mv(path, function () {
                        return res.json("/pangaso-storage/" + id + "." + file_1.name.split('.').pop());
                    });
                }
                return [2 /*return*/];
            });
        });
    };
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
    ResourceController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, parentRecord, hasOneRelationships, _loop_1, index, hasManyRelationships, _loop_2, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        return [4 /*yield*/, req.pangaso.database.update(req.pangaso.resource.collection(), req.params.resource, data)
                            // Here, we'll check if there's a has-one relationship
                        ];
                    case 1:
                        parentRecord = (_a.sent()).value;
                        hasOneRelationships = req.pangaso.resource
                            .fields()
                            .filter(function (field) { return field.type === 'HasOne'; });
                        _loop_1 = function (index) {
                            var _a, hasOneField, relatedResource, reverseRelationshipField, relatedParentRecord, updatedRelatedResources, original;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        hasOneField = hasOneRelationships[index];
                                        relatedResource = req.pangaso.resources.find(function (r) { return r.name() === hasOneField.resource; });
                                        reverseRelationshipField = relatedResource
                                            .fields()
                                            .find(function (field) {
                                            return field.resource === req.pangaso.resource.title();
                                        });
                                        if (!reverseRelationshipField) return [3 /*break*/, 4];
                                        if (!(reverseRelationshipField.type === 'HasMany')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, req.pangaso.database.find(relatedResource.collection(), parentRecord[hasOneField.attribute])
                                            // if the record is found, it's time to perform the
                                            // sync and update
                                        ];
                                    case 1:
                                        relatedParentRecord = _b.sent();
                                        if (!relatedParentRecord) return [3 /*break*/, 4];
                                        updatedRelatedResources = relatedParentRecord[reverseRelationshipField.attribute];
                                        original = relatedParentRecord[reverseRelationshipField.attribute] || [];
                                        console.log('-->', relatedParentRecord[relatedResource.primaryKey()], parentRecord[hasOneField.attribute]);
                                        if (!(original.includes(parentRecord[req.pangaso.resource.primaryKey()]) &&
                                            parentRecord[hasOneField.attribute] !==
                                                relatedParentRecord[relatedResource.primaryKey()])) return [3 /*break*/, 3];
                                        console.log('-----------------> UPDATING DATA', (relatedParentRecord[reverseRelationshipField.attribute] || []).filter(function (i) {
                                            return i !==
                                                parentRecord[req.pangaso.resource.primaryKey()];
                                        }));
                                        // remove it from the old relatedParent
                                        return [4 /*yield*/, req.pangaso.database.update(relatedResource.collection(), relatedParentRecord[relatedResource.primaryKey()], (_a = {},
                                                _a[reverseRelationshipField.attribute] = (relatedParentRecord[reverseRelationshipField.attribute] || []).filter(function (i) {
                                                    return i !==
                                                        parentRecord[req.pangaso.resource.primaryKey()];
                                                }),
                                                _a))];
                                    case 2:
                                        // remove it from the old relatedParent
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        if (!original.includes(parentRecord[req.pangaso.resource.primaryKey()]) &&
                                            parentRecord[hasOneField.attribute] !==
                                                relatedParentRecord[relatedResource.primaryKey()]) {
                                            // fetch the newly related parent and add this parentRecord to it's has-many array.
                                        }
                                        _b.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < hasOneRelationships.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(index)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        hasManyRelationships = req.pangaso.resource
                            .fields()
                            .filter(function (field) { return field.type === 'HasMany'; });
                        _loop_2 = function (index) {
                            var _a, _b, hasManyField, relatedResource, reverseRelationshipField;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        hasManyField = hasManyRelationships[index];
                                        relatedResource = req.pangaso.resources.find(function (r) { return r.title() === hasManyField.resource; });
                                        reverseRelationshipField = relatedResource
                                            .fields()
                                            .find(function (field) {
                                            return field.name === req.pangaso.resource.name();
                                        });
                                        if (!reverseRelationshipField) return [3 /*break*/, 4];
                                        if (!(reverseRelationshipField.type === 'HasOne')) return [3 /*break*/, 3];
                                        // We are going to perform a full sync of the two resources
                                        // in the database.
                                        // First, we'll remove all of the old ones
                                        return [4 /*yield*/, req.pangaso.database.bulkUpdate(relatedResource.collection(), parentRecord[hasManyField.attribute], (_a = {},
                                                _a[reverseRelationshipField.attribute] = null,
                                                _a))
                                            // Next, we'll update
                                            // Next, we'll run this query to populate the new ones that were selected by user
                                        ];
                                    case 1:
                                        // We are going to perform a full sync of the two resources
                                        // in the database.
                                        // First, we'll remove all of the old ones
                                        _c.sent();
                                        // Next, we'll update
                                        // Next, we'll run this query to populate the new ones that were selected by user
                                        return [4 /*yield*/, req.pangaso.database.bulkUpdate(relatedResource.collection(), data[hasManyField.attribute], (_b = {},
                                                _b[reverseRelationshipField.attribute] = parentRecord[req.pangaso.resource.primaryKey()],
                                                _b))];
                                    case 2:
                                        // Next, we'll update
                                        // Next, we'll run this query to populate the new ones that were selected by user
                                        _c.sent();
                                        _c.label = 3;
                                    case 3:
                                        if (reverseRelationshipField.type === 'HasMany') {
                                            // TODO: Add support for has many updates.
                                        }
                                        _c.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _a.label = 6;
                    case 6:
                        if (!(index < hasManyRelationships.length)) return [3 /*break*/, 9];
                        return [5 /*yield**/, _loop_2(index)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        index++;
                        return [3 /*break*/, 6];
                    case 9: 
                    // if there is, then we'll automatically populate the related models.
                    return [2 /*return*/, res.json(parentRecord)];
                }
            });
        });
    };
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
    ResourceController.prototype.action = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, actionId, resources, action, collection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, actionId = _a.action, resources = _a.resources;
                        action = req.pangaso.resource
                            .actions()
                            .find(function (a) { return a.id === actionId; });
                        return [4 /*yield*/, req.pangaso.database.fetchByIds(req.pangaso.resource.collection(), resources)
                            /**
                             *
                             * Run the handle method on the action, passing in
                             * the database connection, request object
                             * and collection of models
                             *
                             */
                        ];
                    case 1:
                        collection = _b.sent();
                        /**
                         *
                         * Run the handle method on the action, passing in
                         * the database connection, request object
                         * and collection of models
                         *
                         */
                        return [4 /*yield*/, action.handle(req.pangaso.database
                                .get()
                                .collection(req.pangaso.resource.collection()), req, collection.map(function (item) { return (__assign({}, item, { _id: new mongodb_1.ObjectID(item._id) })); }))
                            /**
                             *
                             * Resolve and return the message for this action.
                             * This could come from the action definition,
                             * or a default message from pangaso.
                             * TODO: Do this.
                             *
                             */
                        ];
                    case 2:
                        /**
                         *
                         * Run the handle method on the action, passing in
                         * the database connection, request object
                         * and collection of models
                         *
                         */
                        _b.sent();
                        /**
                         *
                         * Resolve and return the message for this action.
                         * This could come from the action definition,
                         * or a default message from pangaso.
                         * TODO: Do this.
                         *
                         */
                        return [2 /*return*/, res.json({})];
                }
            });
        });
    };
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
    ResourceController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.destroy(req.pangaso.resource.collection(), req.body.resources)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, res.json(data)];
                }
            });
        });
    };
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
    ResourceController.prototype.clear = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.pangaso.database.clear(req.params.slug)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json({})];
                }
            });
        });
    };
    return ResourceController;
}());
exports.Resource = new ResourceController();
