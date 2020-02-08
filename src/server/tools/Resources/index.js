"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Router_1 = require("./Router");
var Tool_1 = require("../Tool");
var Express = require("express");
var Root = require("app-root-path");
var FileUpload = require("express-fileupload");
var Resources = /** @class */ (function (_super) {
    __extends(Resources, _super);
    function Resources() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Boot the resources tool
     *
     * @return {void}
     *
     */
    Resources.prototype.boot = function (app) {
        /**
         *
         * Register path as a source for static files
         *
         */
        app.use('/src/client/tools/resources', Express.static(Root.resolve('src/client/tools/resources')));
        /**
         *
         * Register storage path as a source for static files.
         * TODO: this should be the config for storage
         * folder defined by user.
         *
         */
        app.use('/storage', Express.static(process.cwd() + "/storage"));
        /**
         *
         * Define the file upload middleware
         *
         */
        app.use(FileUpload());
        /**
         *
         * Register the routes for this tool
         *
         */
        app.use(Router_1.default);
        /**
         *
         * Define the js for this tool
         *
         */
        this.js('resources', 'src/client/tools/resources/resources.js');
        /**
         *
         * Define the css for this tool
         *
         */
        this.css('resources', 'src/client/tools/resources/resources.css');
    };
    return Resources;
}(Tool_1.Tool));
exports.Resources = Resources;
