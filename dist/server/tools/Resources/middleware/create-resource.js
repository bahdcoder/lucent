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
var Indicative = require("indicative");
var CreateResource = /** @class */ (function () {
    function CreateResource() {
    }
    /**
     *
     * Handle create resource validation
     *
     * @param {Express.Request} req
     *
     * @param {Express.Response} res
     *
     */
    CreateResource.handle = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, data, messages, rules, errors, topLevelRules, _loop_1, _a, _b, _i, attribute, topLevelErrors_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        resource = req.pangaso.resource;
                        data = req.body;
                        messages = CreateResource.customMessages();
                        rules = CreateResource.buildValidationRules(resource);
                        errors = {};
                        topLevelRules = {};
                        _loop_1 = function (attribute) {
                            var rule, _a, _b, _i, embeddedDataIndex, embeddedData, nestedErrors_1, nestedErrors_2;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!rules.hasOwnProperty(attribute)) return [3 /*break*/, 11];
                                        rule = rules[attribute];
                                        if (!(typeof rule === 'string')) return [3 /*break*/, 1];
                                        topLevelRules[attribute] = rule;
                                        return [3 /*break*/, 11];
                                    case 1:
                                        if (!(resource
                                            .fields()
                                            .find(function (field) { return field.attribute === attribute; }).type === 'HasManyEmbedded')) return [3 /*break*/, 8];
                                        errors[attribute] = [];
                                        _a = [];
                                        for (_b in data[attribute])
                                            _a.push(_b);
                                        _i = 0;
                                        _c.label = 2;
                                    case 2:
                                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                                        embeddedDataIndex = _a[_i];
                                        if (!data[attribute].hasOwnProperty(embeddedDataIndex)) return [3 /*break*/, 6];
                                        embeddedData = data[attribute][embeddedDataIndex];
                                        _c.label = 3;
                                    case 3:
                                        _c.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, Indicative.validateAll(embeddedData, rule, messages)];
                                    case 4:
                                        _c.sent();
                                        errors[attribute].push([]);
                                        return [3 /*break*/, 6];
                                    case 5:
                                        nestedErrors_1 = _c.sent();
                                        errors[attribute].push(nestedErrors_1);
                                        return [3 /*break*/, 6];
                                    case 6:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 7: return [3 /*break*/, 11];
                                    case 8:
                                        _c.trys.push([8, 10, , 11]);
                                        return [4 /*yield*/, Indicative.validateAll(data[attribute], rule, messages)];
                                    case 9:
                                        _c.sent();
                                        return [3 /*break*/, 11];
                                    case 10:
                                        nestedErrors_2 = _c.sent();
                                        errors[attribute] = nestedErrors_2;
                                        return [3 /*break*/, 11];
                                    case 11: return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in rules)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        attribute = _a[_i];
                        return [5 /*yield**/, _loop_1(attribute)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, Indicative.validateAll(data, topLevelRules, messages)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        topLevelErrors_1 = _c.sent();
                        errors.topLevelErrors = topLevelErrors_1;
                        return [3 /*break*/, 7];
                    case 7:
                        if (Object.keys(errors).length === 0) {
                            return [2 /*return*/, next()];
                        }
                        return [2 /*return*/, res.status(422).json({
                                resourceErrors: errors
                            })];
                }
            });
        });
    };
    /**
     *
     * Loop through all fields for a resource and build validation rules
     *
     * @param {IResource}
     *
     * @return {object}
     *
     */
    CreateResource.buildValidationRules = function (resource) {
        var rules = {};
        resource
            .fields()
            .filter(function (field) { return field.type !== 'ID' && !field.computed; })
            .forEach(function (field) {
            if (['HasManyEmbedded', 'HasOneEmbedded'].includes(field.type)) {
                rules[field.attribute] = {};
                field.fields &&
                    field.fields.forEach(function (embeddedField) {
                        if (embeddedField.creationRules) {
                            rules[field.attribute][embeddedField.attribute] = embeddedField.creationRules;
                        }
                    });
            }
            if (field.creationRules &&
                !['HasManyEmbedded', 'HasOneEmbedded'].includes(field.type)) {
                rules[field.attribute] = field.creationRules;
            }
        });
        return rules;
    };
    /**
     *
     * Define custom validation messages
     *
     * @return {Object}
     *
     */
    CreateResource.customMessages = function () {
        return {
            required: 'The {{ field }} is required.',
            email: 'The {{ field }} must be a valid email.'
        };
    };
    return CreateResource;
}());
exports.CreateResourceValidator = CreateResource.handle;
