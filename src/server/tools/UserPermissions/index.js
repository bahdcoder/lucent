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
var Tool_1 = require("../Tool");
var Express = require("express");
var Root = require("app-root-path");
var UserPermissions = /** @class */ (function (_super) {
    __extends(UserPermissions, _super);
    function UserPermissions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Boot the resources tool
     *
     * @return {void}
     *
     */
    UserPermissions.prototype.boot = function (app) {
        /**
         *
         * Register path as a source for static files
         *
         */
        app.use('/dashboard', Express.static(Root.resolve('dashboard')));
        /**
         *
         * Define the js for this tool
         *
         */
        this.js('resources', 'dashboard/tools/dashboard.js');
        /**
         *
         * Define the css for this tool
         *
         */
        this.css('resources', 'dashboard/tools/dashboard.css');
    };
    return UserPermissions;
}(Tool_1.Tool));
exports.UserPermissions = UserPermissions;
