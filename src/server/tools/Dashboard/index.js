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
var Path = require("path");
var Tool_1 = require("../Tool");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Boot the resources tool
     *
     * @return {void}
     *
     */
    Dashboard.prototype.boot = function (app) {
        _super.prototype.boot.call(this, app);
        /**
         *
         * Define the js for this tool
         *
         */
        this.js('/lucent/dashboard/dashboard.js', Path.join(__dirname, '..', '..', '..', '/client/tools/dashboard/dashboard.js'));
        /**
         *
         * Define the css for this tool
         *
         */
        this.css('/lucent/dashboard/dashboard.css', Path.join(__dirname, '..', '..', '..', '/client/tools/dashboard/dashboard.css'));
    };
    return Dashboard;
}(Tool_1.Tool));
exports.Dashboard = Dashboard;
