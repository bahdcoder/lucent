"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeCase = require("change-case");
var Filter = /** @class */ (function () {
    function Filter() {
    }
    /**
     * Define the name of the filter
     *
     * @return {string}
     */
    Filter.prototype.name = function () {
        return ChangeCase.sentenceCase(this.constructor.name);
    };
    /**
     *
     * Define the attribute of the filter
     */
    Filter.prototype.attribute = function () {
        return ChangeCase.camelCase(this.constructor.name);
    };
    /**
     *
     * Define the name of the component too be used on client side
     * This will also be used to determine the type of the filter.
     * For example, boolean filters will have {form-boolean}
     *
     * @return {string}
     */
    Filter.prototype.component = function () {
        return '';
    };
    /**
     *
     * Define the default value of a filter
     *
     * @return {string}
     */
    Filter.prototype.default = function () {
        return '';
    };
    /**
     *
     * Define the options of this filter
     *
     * @return {Array}
     */
    Filter.prototype.options = function () {
        return [];
    };
    /**
     *
     * Apply the filter to the given query.
     *
     * @param {object} request express request object
     * @param {object} builder mongodb builder cursor
     * @param {mixed} value selected filter value from frontend
     *
     * @return {object}
     *
     */
    Filter.prototype.apply = function () { };
    /**
     * Serialize the filter for the frontend
     *
     * @return {object}
     */
    Filter.prototype.serialize = function () {
        return __assign(__assign({}, this), { name: this.name(), default: this.default(), options: this.options(), attribute: this.attribute(), component: this.component() });
    };
    return Filter;
}());
exports.Filter = Filter;
