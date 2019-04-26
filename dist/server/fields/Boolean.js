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
var Boolean = /** @class */ (function (_super) {
    __extends(Boolean, _super);
    /**
     * Initialize the Boolean field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    function Boolean(name, attribute) {
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
        _this.type = 'Boolean';
        _this.name = name;
        _this.type = 'Boolean';
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     *
     * Make a Boolean
     *
     * @return {Boolean}
     *
     */
    Boolean.make = function (name, attribute) {
        return new Boolean(name, attribute);
    };
    return Boolean;
}(Field_1.Field));
exports.Boolean = Boolean;
