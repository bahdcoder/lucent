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
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    /**
     * Initialize the Select field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    function Select(name, attribute) {
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
        _this.type = 'Select';
        /**
         * Define this select as a combobox
         *
         * @var {boolean}
         */
        _this.isCombobox = false;
        /**
         *
         * Define the options for this select field
         *
         * @var {Array[SelectOptions]}
         */
        _this.options = [];
        _this.name = name;
        _this.attribute = attribute || ChangeCase.camelCase(_this.name);
        return _this;
    }
    /**
     * Set the options for select
     *
     * @param options SelectOptions[]
     *
     * @return {Select}
     *
     */
    Select.prototype.withOptions = function (options) {
        this.options = options;
        return this;
    };
    /**
     * Make this select a combobox
     *
     * @return {Select}
     */
    Select.prototype.asCombobox = function () {
        this.isCombobox = true;
        return this;
    };
    /**
     *
     * Make a Select
     *
     * @return {Select}
     *
     */
    Select.make = function (name, attribute) {
        return new Select(name, attribute);
    };
    return Select;
}(Field_1.Field));
exports.Select = Select;
