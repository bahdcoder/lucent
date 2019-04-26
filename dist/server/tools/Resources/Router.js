"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var resource_controller_1 = require("./controllers/resource.controller");
var set_resource_1 = require("./middleware/set-resource");
var create_resource_1 = require("./middleware/create-resource");
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
/**
 *
 * Define the api resources
 *
 */
router.get('/api/resources', AsyncWrapper(resource_controller_1.Resource.index));
/**
 *
 * Define the route for fetching all database records for a specific resource
 *
 */
router.get('/api/resources/:slug', set_resource_1.SetResourceMiddleware, AsyncWrapper(resource_controller_1.Resource.fetch));
/**
 *
 * Define the route for fetching a single database record for a specific collection/resource
 *
 */
router.get('/api/resources/:slug/:resource', set_resource_1.SetResourceMiddleware, AsyncWrapper(resource_controller_1.Resource.show));
/**
 *
 * Define the route for running a specific action on a list of selected resources
 *
 */
router.post('/api/resources/:slug/run-action', set_resource_1.SetResourceMiddleware, AsyncWrapper(resource_controller_1.Resource.action));
/**
 *
 * Define the route for updating a single database record for a specific collection/resource
 *
 */
router.put('/api/resources/:slug/:resource', set_resource_1.SetResourceMiddleware, AsyncWrapper(resource_controller_1.Resource.update));
/**
 *
 * Define the route for created a new database record for a specific resource
 *
 */
router.post('/api/resources/:slug', set_resource_1.SetResourceMiddleware, create_resource_1.CreateResourceValidator, AsyncWrapper(resource_controller_1.Resource.store));
/**
 *
 * Define the route for deleting all specified records for a specific resource
 *
 */
router.delete('/api/resources/:slug', set_resource_1.SetResourceMiddleware, AsyncWrapper(resource_controller_1.Resource.delete));
exports.default = router;
