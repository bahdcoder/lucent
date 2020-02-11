"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var tool_controller_1 = require("./controllers/tool.controller");
var router = Express.Router();
/**
 *
 * Define the api resources
 *
 */
router.get('/api/tools', tool_controller_1.Tool.index);
var auth = function (req, res, next) {
    return next();
};
/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get('*', function (req, res) {
    return res.render('index', {
        tools: req.lucent.tools,
        // @ts-ignore
        resources: req.session.user
            ? JSON.stringify(req.lucent.resources.map(function (resource) {
                // @ts-ignore
                return resource.serialize(req.session.user);
            }))
            : [],
        user: req.session ? JSON.stringify(req.session.user) : null
    });
});
exports.default = router;
