import { IFieldMeta, IField } from '../index.d';
export declare class Field implements IField {
    /**
     *
     * Define meta data for this field
     *
     * @var {Object}
     *
     */
    meta: IFieldMeta;
    /**
     *
     * Define if this field is nullable or not
     *
     * @var {boolean}
     *
     */
    canBeNull: boolean;
    /**
     *
     * Define the field type
     *
     * @var {string}
     *
     */
    type: string;
    /**
     *
     * Make this field searchable
     *
     * @var {boolean}
     *
     */
    isSearchable: boolean;
    /**
     * Define the component
     *
     * @var {string}
     *
     */
    component: string;
    /**
     * Define the detail component
     *
     * @var {string}
     *
     */
    detail: string;
    /**
     *
     * Define this field as a computed field
     *
     * @var {boolean}
     *
     */
    computed: boolean;
    /**
     *
     * This is used to resolve the value of a computed property
     *
     * @var {Function}
     *
     */
    computedResolver: Function;
    /**
     *
     * Define the name of this field.
     *
     * @var {string}
     *
     */
    name: string;
    /**
     *
     * Define if this field is sortable or not
     *
     * @var {boolean}
     *
     */
    canBeSorted: boolean;
    /**
     *
     * Define callback function to be used to define field value
     *
     * @var {Function}
     *
     */
    resolveCallback: Function | null;
    /**
     * Rules to be used when updating a field
     *
     * @var {String}
     */
    updateRules: string;
    /**
     *
     * The matching database collection attribute for this field
     *
     * @var {string}
     *
     */
    attribute: string;
    /**
     * Rules to be used when creating a field
     *
     * @var {String}
     */
    creationRules: string;
    /**
     *
     * Determine if a field should be hidden on creation form
     *
     * @var {Boolean}
     *
     */
    hideOnCreationForm: boolean;
    /**
     *
     * Determine if a field should be hidden on index page
     *
     * @var {Boolean}
     *
     */
    hideOnIndexPage: boolean;
    /**
     *
     * Determine if a field should be hidden on update form
     *
     * @var {Boolean}
     *
     */
    hideOnUpdateForm: boolean;
    /**
     *
     * Determine if field should be hidden on detail page
     *
     * @var {boolean}
     *
     */
    hideOnDetailPage: boolean;
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
    createWithRules(rules: string): this;
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
    updateWithRules(rules: string): this;
    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    sortable(): this;
    /**
     * Mark this field as searchable
     *
     * @return {Field}
     *
     */
    searchable(): this;
    /**
     *
     * Marks a field as a computed field
     *
     * @param {Function} resolver
     *
     * @return {Field}
     *
     */
    computedWith(resolver: Function): this;
    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    resolve(callback: Function): this;
    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    nullable(): this;
    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    help(text: string): this;
    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    hideWhenCreating(): this;
    /**
     *
     * Hide a field on the index resource page
     *
     * @return {Field}
     *
     */
    hideOnIndex(): this;
    /**
     *
     * Hide a field on detail
     *
     * @return {Field}
     *
     */
    hideOnDetail(): this;
    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    hideWhenUpdating(): this;
}
