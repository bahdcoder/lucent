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
var Password = /** @class */ (function (_super) {
    __extends(Password, _super);
    /**
     * Initialize the Password field
     *
     * @param {string} name
     *
     * @return {voPassword}
     *
     */
    function Password(name, attribute) {
        if (attribute === void 0) { attribute = ''; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.attribute = attribute;
        /**
         * Define the type of this field
         *
         * @var {String}
         *
         */
        _this.type = 'Password';
        _this.name = name;
        _this.type = 'Password';
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        _this.hideOnIndex();
        _this.hideOnDetail();
        return _this;
    }
    /**
     *
     * Make a new Password
     *
     * @return {Password}
     *
     */
    Password.make = function (name, attribute) {
        return new Password(name, attribute);
    };
    return Password;
}(Field_1.Field));
exports.Password = Password;
