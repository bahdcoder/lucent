"use strict";
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
     * Add scripts to pangaso
     *
     * @return {void}
     *
     */
    Tool.prototype.js = function (name, path) {
        this.scripts = this.scripts.concat([{ name: name, path: path }]);
        return this;
    };
    /**
     * Add styles to pangaso
     *
     * @return {void}
     *
     */
    Tool.prototype.css = function (name, path) {
        this.styles = this.styles.concat([{ name: name, path: path }]);
        return this;
    };
    return Tool;
}());
exports.Tool = Tool;
