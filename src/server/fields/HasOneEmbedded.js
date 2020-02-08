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
var HasOneEmbedded = /** @class */ (function (_super) {
    __extends(HasOneEmbedded, _super);
    /**
     *
     * Initialize a HasOneEmbedded instance
     *
     * @param {String} name the name of the field this resource
     *
     * @param {string}  attribute the matching attribute field
     *
     * @return {null}
     *
     */
    function HasOneEmbedded(name, attribute) {
        var _this = _super.call(this) || this;
        /**
         *
         * Define a type for this field
         *
         * @var {String}
         *
         */
        _this.type = 'HasOneEmbedded';
        /**
         *
         * Declare the resource this field relates to
         *
         * @type {String}
         *
         */
        _this.resource = null;
        /**
         * This declares the fields variable. Will save the
         *
         *
         * @type {IField}
         *
         */
        _this.fields = [];
        _this.name = name;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        _this.hideOnIndex();
        _this.hideOnDetail();
        return _this;
    }
    /**
     *
     * Make a HasOneEmbedded Instance
     *
     * @param  {...any} args
     *
     * @return {HasOneEmbedded}
     *
     */
    HasOneEmbedded.make = function (name, attribute) {
        return new HasOneEmbedded(name, attribute);
    };
    /**
     *
     * Define the fields for this embedded resource
     *
     * @param fields {IField}
     *
     * @return {HasOneEmbedded}
     *
     */
    HasOneEmbedded.prototype.withFields = function (fields) {
        this.fields = fields;
        return this;
    };
    return HasOneEmbedded;
}(Field_1.Field));
exports.HasOneEmbedded = HasOneEmbedded;
