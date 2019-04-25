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
var Field_1 = require("./Field");
var ChangeCase = require("change-case");
var Date = /** @class */ (function (_super) {
    __extends(Date, _super);
    function Date(name, attribute) {
        var _this = _super.call(this) || this;
        /**
         * Define the type for this field
         *
         * @type {String}
         *
         */
        _this.type = 'Date';
        /**
         *
         * Define a property to check if this date
         * field should have time
         *
         *
         * @type {Boolean}
         *
         */
        _this.enableTime = false;
        _this.name = name;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     *
     * Make a new Date
     *
     * @return {Date}
     *
     */
    Date.make = function (name, attribute) {
        return new Date(name, attribute);
    };
    /**
     *
     * Set time to true, to create a date time field
     *
     * @return {Date}
     *
     */
    Date.prototype.withTime = function () {
        this.enableTime = true;
        return this;
    };
    return Date;
}(Field_1.Field));
exports.Date = Date;
