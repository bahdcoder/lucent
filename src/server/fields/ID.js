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
var ID = /** @class */ (function (_super) {
    __extends(ID, _super);
    /**
     * Initialize the ID field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    function ID(name, attribute) {
        if (attribute === void 0) { attribute = '_id'; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.attribute = attribute;
        /**
         * Define the type of this field
         *
         * @var {String}
         *
         */
        _this.type = 'ID';
        _this.name = name;
        _this.type = 'ID';
        _this.attribute = attribute;
        _this.hideWhenCreating();
        return _this;
    }
    /**
     *
     * Make a new ID
     *
     * @return {ID}
     *
     */
    ID.make = function (name, attribute) {
        return new ID(name, attribute);
    };
    return ID;
}(Field_1.Field));
exports.ID = ID;
