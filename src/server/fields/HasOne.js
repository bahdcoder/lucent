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
var HasOne = /** @class */ (function (_super) {
    __extends(HasOne, _super);
    /**
     *
     * Initialize a HasOne instance
     *
     * @param {String} relatedResource
     *
     * @return {null}
     *
     */
    function HasOne(name, attribute, resource) {
        var _this = _super.call(this) || this;
        /**
         * Define a type for this field
         *
         * @var {String}
         *
         */
        _this.type = 'HasOne';
        /**
         *
         * Declare the resource this field relates to
         *
         * @type {String}
         *
         */
        _this.resource = null;
        _this.name = name;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        _this.resource = resource || ChangeCase.pascalCase(_this.attribute);
        _this.hideOnIndex();
        _this.hideOnDetail();
        return _this;
    }
    /**
     * Make a HasOne Instance
     *
     * @param {string} name the name of the relationship
     *
     * @param {string} attribute the name of the attribute on this resource
     *
     * @param {string} resource the name of the matching related resource
     *
     * @param  {...any} args
     *
     * @return {HasOne}
     *
     */
    HasOne.make = function (name, attribute, resource) {
        return new HasOne(name, attribute, resource);
    };
    return HasOne;
}(Field_1.Field));
exports.HasOne = HasOne;
