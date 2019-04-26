import { IFieldMeta } from '../index.d'
import * as ChangeCase from 'change-case'

export class Field {
    /**
     *
     * Define meta data for this field
     *
     * @var {Object}
     *
     */
    public meta: IFieldMeta = {
        helpText: ''
    }

    /**
     *
     * Define if this field is nullable or not
     *
     * @var {boolean}
     *
     */
    public canBeNull: boolean = false

    /**
     * Define the component
     *
     * @var {string}
     *
     */
    public component: string = `form-${ChangeCase.lowerCase(
        this.constructor.name
    )}`

    /**
     * Define the detail component
     *
     * @var {string}
     *
     */
    public detail: string = `detail-${ChangeCase.lowerCase(
        this.constructor.name
    )}`

    /**
     *
     * Define the name of this field.
     *
     * @var {string}
     *
     */
    public name: string = ''

    /**
     *
     * Define if this field is sortable or not
     *
     * @var {boolean}
     *
     */
    public canBeSorted: boolean = false

    /**
     *
     * Define callback function to be used to define field value
     *
     * @var {Function}
     *
     */
    public resolveCallback: Function | null = null

    /**
     * Rules to be used when updating a field
     *
     * @var {String}
     */
    public updateRules: string = ''

    /**
     *
     * The matching database attribute for this field
     *
     * @var {string}
     *
     */
    public attribute: string = ''

    /**
     * Rules to be used when creating a field
     *
     * @var {String}
     */
    public creationRules: string = ''

    /**
     *
     * Determine if a field should be hidden on creation form
     *
     * @var {Boolean}
     *
     */
    public hideOnCreationForm: boolean = false

    /**
     *
     * Determine if a field should be hidden on index page
     *
     * @var {Boolean}
     *
     */
    public hideOnIndexPage: boolean = false

    /**
     *
     * Determine if a field should be hidden on update form
     *
     * @var {Boolean}
     *
     */
    public hideOnUpdateForm: boolean = false

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
    createWithRules(rules: string) {
        this.creationRules = rules

        return this
    }

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
    updateWithRules(rules: string) {
        this.updateRules = rules

        return this
    }

    /**
     * Mark this field as sortable
     *
     * @return {Field}
     *
     */
    sortable() {
        this.canBeSorted = true

        return this
    }

    /**
     * Callback to be used to calculate
     * the value of this field.
     *
     * @param {Function} callback
     *
     * @return {Field}
     *
     */
    resolve(callback: Function) {
        this.resolveCallback = callback
        return this
    }

    /**
     * Mark this field as nullable
     *
     * @return {Field}
     *
     */
    nullable() {
        this.canBeNull = true

        return this
    }

    /**
     * Set the help text for this field
     *
     * @param {String} text
     *
     * @return {Field}
     *
     */
    public help(text: string) {
        this.meta.helpText = text

        return this
    }

    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    public hideWhenCreating() {
        this.hideOnCreationForm = true

        return this
    }

    /**
     *
     * Hide a field on the index resource page
     *
     * @return {Field}
     *
     */
    public hideOnIndex() {
        this.hideOnIndexPage = true

        return this
    }

    /**
     *
     * Hide a field on the creation form
     *
     * @return {Field}
     *
     */
    public hideWhenUpdating() {
        this.hideOnUpdateForm = true

        return this
    }
}
