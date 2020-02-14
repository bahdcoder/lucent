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
var Bcrypt = require("bcryptjs");
var Indicative = require("indicative");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.register = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var errors_1, formattedErrors_1, userResource, roleResource, permissionResource, adminRole, existingAdmin, permissions, permissionsForRole, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Indicative.validateAll(request.body, {
                                email: 'required|email',
                                name: 'required',
                                password: 'required|min:8'
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        errors_1 = _a.sent();
                        formattedErrors_1 = {};
                        errors_1.forEach(function (error) {
                            formattedErrors_1[error.field] = error.message;
                        });
                        return [2 /*return*/, response.status(400).json(formattedErrors_1)];
                    case 3:
                        userResource = request.lucent.resources.find(function (resource) { return resource.name() === 'User'; });
                        roleResource = request.lucent.resources.find(function (resource) { return resource.name() === 'Role'; });
                        permissionResource = request.lucent.resources.find(function (resource) { return resource.name() === 'Permission'; });
                        return [4 /*yield*/, request.lucent.database.findOneWhere(roleResource.collection(), {
                                name: 'admin'
                            })];
                    case 4:
                        adminRole = _a.sent();
                        console.log('=========>', adminRole);
                        return [4 /*yield*/, request.lucent.database.findOneWhere(userResource.collection(), {
                                role: adminRole._id.toString()
                            })];
                    case 5:
                        existingAdmin = _a.sent();
                        if (existingAdmin)
                            return [2 /*return*/, response.status(400).json({
                                    email: ['An administrator user already exists.']
                                })];
                        return [4 /*yield*/, request.lucent.database.insert(userResource.collection(), __assign(__assign({}, request.body), { role: adminRole._id.toString(), password: Bcrypt.hashSync(request.body.password) }))];
                    case 6:
                        _a.sent();
                        permissions = {};
                        return [4 /*yield*/, request.lucent.database.findAll(permissionResource.collection(), adminRole.permissions)];
                    case 7:
                        permissionsForRole = _a.sent();
                        permissionsForRole.forEach(function (permission) {
                            // @ts-ignore
                            permissions[permission.slug] = true;
                        });
                        return [4 /*yield*/, request.lucent.database.findOneWhere(userResource.collection(), {
                                email: request.body.email
                            })
                            // @ts-ignore
                        ];
                    case 8:
                        user = _a.sent();
                        // @ts-ignore
                        request.session.user = __assign(__assign({}, user), { permissions: permissions });
                        return [2 /*return*/, response.status(201).json(user)];
                }
            });
        });
    };
    AuthController.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userResource, roleResource, permissionResource, user, role, permissions, permissionsForRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userResource = request.lucent.resources.find(function (resource) { return resource.name() === 'User'; });
                        roleResource = request.lucent.resources.find(function (resource) { return resource.name() === 'Role'; });
                        permissionResource = request.lucent.resources.find(function (resource) { return resource.name() === 'Permission'; });
                        return [4 /*yield*/, request.lucent.database.findOneWhere(userResource.collection(), {
                                email: request.body.email
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, response.status(400).json({
                                    email: ['These credentials do not match our records.']
                                })];
                        if (!Bcrypt.compareSync(request.body.password, user.password))
                            return [2 /*return*/, response.status(400).json({
                                    email: ['These credentials do not match our records.']
                                })];
                        return [4 /*yield*/, request.lucent.database.find(roleResource.collection(), user.role)];
                    case 2:
                        role = _a.sent();
                        permissions = {};
                        console.log('xxxxxxxx', role);
                        if (!role) return [3 /*break*/, 4];
                        return [4 /*yield*/, request.lucent.database.findAll(permissionResource.collection(), role.permissions || [])];
                    case 3:
                        permissionsForRole = _a.sent();
                        permissionsForRole.forEach(function (permission) {
                            // @ts-ignore
                            permissions[permission.slug] = true;
                        });
                        _a.label = 4;
                    case 4:
                        // @ts-ignore
                        request.session.user = __assign(__assign({}, user), { permissions: permissions });
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    AuthController.prototype.init = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userResource, roleResource, adminRole, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userResource = request.lucent.resources.find(function (resource) { return resource.name() === 'User'; });
                        roleResource = request.lucent.resources.find(function (resource) { return resource.name() === 'Role'; });
                        return [4 /*yield*/, request.lucent.database.findOneWhere(roleResource.collection(), {
                                name: 'admin'
                            })];
                    case 1:
                        adminRole = _a.sent();
                        return [4 /*yield*/, request.lucent.database.findOneWhere(userResource.collection(), {
                                role: adminRole._id.toString()
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, response.json({
                                hasAdmin: !!user
                            })];
                }
            });
        });
    };
    /**
     * Fetch the authenticated user
     */
    AuthController.prototype.me = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, response.json(request.lucent.user)];
            });
        });
    };
    /**
     * Delete the current user's session
     */
    AuthController.prototype.logout = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // @ts-ignore
                request.session.user = null;
                return [2 /*return*/, response.json([])];
            });
        });
    };
    return AuthController;
}());
exports.Auth = new AuthController();
