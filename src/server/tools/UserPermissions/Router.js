"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var auth_1 = require("./middleware/auth");
var auth_controller_1 = require("./controllers/auth.controller");
var router = Express.Router();
/**
 *
 * Async wrapper to catch all async errors
 *
 * @param {Function} Fn
 *
 * @return {Function}
 *
 */
var AsyncWrapper = function (Fn) { return function (req, res, next) { return Fn(req, res, next).catch(next); }; };
router.post('/api/auth/login', auth_controller_1.Auth.login);
router.get('/api/auth/me', auth_1.default, auth_controller_1.Auth.me);
exports.default = router;
