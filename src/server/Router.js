"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var Edge = require("edge.js");
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
    var template = Fs.readFileSync(Path.join(__dirname, '..', '/client/public/index.edge')).toString();
    var fileContent = Edge.renderString(template, {
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
    res.send(fileContent);
});
exports.default = router;
