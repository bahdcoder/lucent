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
var HasMany = /** @class */ (function (_super) {
    __extends(HasMany, _super);
    /**
     * Create a new instance of this field
     *
     * @param {string }name
     * @param {string} resource
     * @param {string} attribute
     *
     * @return {void}
     *
     */
    function HasMany(name, resource, attribute) {
        if (attribute === void 0) { attribute = ''; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.resource = resource;
        _this.attribute = attribute;
        /**
         * Define the type of thie field
         *
         * @var {String}
         *
         */
        _this.type = 'HasMany';
        _this.name = name;
        _this.resource = resource;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     *
     * Create a new HasMany relationship instance
     *
     * @return {HasMany}
     *
     */
    HasMany.make = function (name, resource, attribute) {
        return new HasMany(name, resource, attribute);
    };
    return HasMany;
}(Field_1.Field));
exports.HasMany = HasMany;
