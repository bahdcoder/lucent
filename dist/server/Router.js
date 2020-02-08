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
/**
 *
 * Handle all the assets for the dashboard.
 *
 */
router.get('*', function (req, res) {
    return res.render('index', {
        tools: req.lucent.tools,
        resources: JSON.stringify(req.lucent.resources.map(function (resource) {
            return resource.serialize();
        }))
    });
});
exports.default = router;
