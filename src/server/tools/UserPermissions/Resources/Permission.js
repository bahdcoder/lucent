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
var ID_1 = require("../../../fields/ID");
var Text_1 = require("../../../fields/Text");
var Resource_1 = require("../../../Resource");
var Textarea_1 = require("../../../fields/Textarea");
var Permission = /** @class */ (function (_super) {
    __extends(Permission, _super);
    function Permission() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Permission.prototype.displayValue = function () {
        return 'slug';
    };
    Permission.prototype.fields = function () {
        return [
            ID_1.ID.make('ID'),
            Text_1.Text.make('Slug').searchable().createWithRules('required'),
            Textarea_1.Textarea.make('Description'),
        ];
    };
    Permission.prototype.collection = function () {
        return "lucent-" + _super.prototype.collection.call(this);
    };
    Permission.prototype.availableForNavigation = function () {
        return false;
    };
    return Permission;
}(Resource_1.BaseResource));
exports.Permission = Permission;
