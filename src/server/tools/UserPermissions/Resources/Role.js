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
var HasMany_1 = require("../../../fields/HasMany");
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Role.prototype.displayValue = function () {
        return 'name';
    };
    Role.prototype.fields = function () {
        return [
            ID_1.ID.make('ID'),
            Text_1.Text.make('Name').createWithRules('required'),
            HasMany_1.HasMany.make('Permissions').createWithRules('required')
        ];
    };
    Role.prototype.collection = function () {
        return "lucent-" + _super.prototype.collection.call(this);
    };
    Role.prototype.permissions = function () {
        return [
            'create-role',
            'read-role',
            'update-role',
            'delete-role'
        ];
    };
    Role.prototype.availableForNavigation = function () {
        return false;
    };
    return Role;
}(Resource_1.BaseResource));
exports.Role = Role;
