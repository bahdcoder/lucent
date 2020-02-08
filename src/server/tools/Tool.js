"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var ChangeCase = require("change-case");
var Tool = /** @class */ (function () {
    function Tool() {
        /**
         *
         * Define the scripts for this tool
         *
         * @type {string}
         *
         */
        this.scripts = [];
        /**
         *
         * The express application
         *
         * @type {Express.Application}
         *
         */
        this.app = null;
        /**
         *
         * Define the name of the resource
         *
         * @type {string}
         *
         */
        this.id = ChangeCase.camelCase(this.constructor.name);
        /**
         *
         * Define the name of the tool
         *
         * @type {string}
         *
         */
        this.name = ChangeCase.sentenceCase(this.constructor.name);
        /**
         *
         * Define the styles for this tool
         *
         * @type {string}
         *
         */
        this.styles = [];
    }
    /**
     *
     * Set the name of the tool
     *
     * @type {string}
     *
     */
    Tool.prototype.withName = function (name) {
        this.name = name;
        return this;
    };
    Tool.prototype.boot = function (app) {
        this.app = app;
    };
    /**
     *
     * Define the boot method for this tool
     *
     * @return {void}
     *
     */
    Tool.prototype.static = function (path) {
        if (!this.app) {
            return;
        }
        this.app.use(Express.static(path));
    };
    /**
     *
     * Add scripts to Lucent
     *
     * @return {void}
     *
     */
    Tool.prototype.js = function (name, path) {
        this.scripts = __spreadArrays(this.scripts, [{ name: name, path: path }]);
        return this;
    };
    /**
     * Add styles to Lucent
     *
     * @return {void}
     *
     */
    Tool.prototype.css = function (name, path) {
        this.styles = __spreadArrays(this.styles, [{ name: name, path: path }]);
        return this;
    };
    return Tool;
}());
exports.Tool = Tool;
