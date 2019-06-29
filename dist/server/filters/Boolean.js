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
var Filter_1 = require("./Filter");
var BooleanFilter = /** @class */ (function (_super) {
    __extends(BooleanFilter, _super);
    function BooleanFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * Define the component to be used to render this filter
     *
     * @return {string}
     */
    BooleanFilter.prototype.component = function () {
        return 'filter-boolean';
    };
    /**
     *
     * Define default boolean values
     *
     * @return {Array}
     */
    BooleanFilter.prototype.default = function () {
        return [];
    };
    return BooleanFilter;
}(Filter_1.Filter));
exports.BooleanFilter = BooleanFilter;
