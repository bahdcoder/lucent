"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeCase = require("change-case");
var Field = /** @class */ (function () {
    function Field() {
        /**
         *
         * Define meta data for this field
         *
         * @var {Object}
         *
         */
        this.meta = {
            helpText: ''
        };
        /**
         *
         * Define if this field is nullable or not
         *
         * @var {boolean}
         *
         */
        this.canBeNull = false;
        /**
         *
         * Make this field searchable
         *
         * @var {boolean}
         *
         */
        this.isSearchable = false;
        /**
         * Define the component
         *
         * @var {string}
         *
         */
        this.component = "form-" + ChangeCase.lowerCase(this.constructor.name);
        /**
         * Define the detail component
         *
         * @var {string}
         *
         */
        this.detail = "detail-" + ChangeCase.lowerCase(this.constructor.name);
        /**
         *
         * Define the name of this field.
         *
         * @var {string}
         *
         */
        this.name = '';
        /**
         *
         * Define if this field is sortable or not
         *
         * @var {boolean}
         *
         */
        this.canBeSorted = false;
        /**
         *
         * Define callback function to be used to define field value
         *
         * @var {Function}
         *
         */
        this.resolveCallback = null;
        /**
         * Rules to be used when updating a field
         *
         * @var {String}
         */
        this.updateRules = '';
        /**
         *
         * The matching database attribute for this field
         *
         * @var {string}
         *
         */
        this.attribute = '';
        /**
         * Rules to be used when creating a field
         *
         * @var {String}
         */
        this.creationRules = '';
        /**
         *
         * Determine if a field should be hidden on creation form
         *
         * @var {Boolean}
         *
         */
        this.hideOnCreationForm = false;
        /**
         *
         * Determine if a field should be hidden on index page
         *
         * @var {Boolean}
         *
         */
        this.hideOnIndexPage = false;
        /**
         *
         * Determine if a field should be hidden on update form
         *
         * @var {Boolean}
         *
         */
        this.hideOnUpdateForm = false;
        /**
         *
         * Determine if field should be hidden on detail page
         *
         * @var {boolean}
         *
         */
        this.hideOnDetailPage = false;
    }
    /**
     *
     * Define validation rules to be used for creation
     * for this field.
     *
     * @param {Object} rules
     *
     * @return {Field}
     *
     */
    Field.prototype.createWithRules = function (rules) {
        this.creationRules = rules;
        return this;
    };
    /**
     *
     * Define validation rules to be used for updating
     * for this field.
     *
     * @param {Object} rules
     *
     * @return {Field}
     *
     */
    Field.prototype.updateWithRules = function (rules) {
        this.updateRules = rules;
        return this;
    };
    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    Field.prototype.sortable = function () {
        this.canBeSorted = true;
        return this;
    };
    /**
     * Mark this field as searchable
     *
     * @return {Field}
     *
     */
    Field.prototype.searchable = function () {
        this.isSearchable = true;
        return this;
    };
    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    Field.prototype.resolve = function (callback) {
        this.resolveCallback = callback;
        return this;
    };
    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    Field.prototype.nullable = function () {
        this.canBeNull = true;
        return this;
    };
    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    Field.prototype.help = function (text) {
        this.meta.helpText = text;
        return this;
    };
    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    Field.prototype.hideWhenCreating = function () {
        this.hideOnCreationForm = true;
        return this;
    };
    /**
     *
     * Hide a field on the index resource page
     *
     * @return {Field}
     *
     */
    Field.prototype.hideOnIndex = function () {
        this.hideOnIndexPage = true;
        return this;
    };
    /**
     *
     * Hide a field on detail
     *
     * @return {Field}
     *
     */
    Field.prototype.hideOnDetail = function () {
        this.hideOnDetailPage = true;
        return this;
    };
    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    Field.prototype.hideWhenUpdating = function () {
        this.hideOnUpdateForm = true;
        return this;
    };
    return Field;
}());
exports.Field = Field;
