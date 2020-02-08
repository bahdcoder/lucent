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
var Filter_1 = require("./Filter");
var DateFilter = /** @class */ (function (_super) {
    __extends(DateFilter, _super);
    function DateFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    DateFilter.prototype.component = function () {
        return 'filter-date';
    };
    /**
     *
     * Define default boolean values
     *
     * @return {Date}
     */
    DateFilter.prototype.default = function () {
        return new Date();
    };
    /**
     * Define this date format used by the date picker
     *
     * @return {String}
     */
    DateFilter.prototype.dateFormat = function () {
        return 'YYYY-mm-dd';
    };
    /**
     * Define if this filter date picker should have time
     *
     * @return {Boolean}
     */
    DateFilter.prototype.withTime = function () {
        return false;
    };
    /**
     * Serialize the filter for the frontend
     *
     * @return {object}
     */
    DateFilter.prototype.serialize = function () {
        return __assign(__assign({}, this), { name: this.name(), default: this.default(), options: this.options(), attribute: this.attribute(), component: this.component(), dateFormat: this.dateFormat(), enableTime: this.withTime() });
    };
    return DateFilter;
}(Filter_1.Filter));
exports.DateFilter = DateFilter;
