import { Field } from './Field'
import * as ChangeCase from 'change-case'

export class Textarea extends Field {
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    public type: string = 'Textarea'

    /**
     * Define the number of rows for this textarea
     *
     * @var {number}
     *
     */
    public rowsCount: number = 4

    /**
     *
     * This property removes the textarea toggle show/hide
     * functionality on the details screen
     *
     * @var {boolean}
     *
     */
    public shouldAlwaysShow: boolean = false

    /**
     * Initialize the Textarea field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(public name: string, public attribute: string = '') {
        super()

        this.name = name
        this.type = 'Textarea'
        this.attribute = attribute || ChangeCase.camelCase(this.name)

        this.hideOnIndex()
    }

    /**
     *
     * Make a new Textarea
     *
     * @return {Textarea}
     *
     */
    static make(name: string, attribute?: string) {
        return new Textarea(name, attribute)
    }

    /**
     * Set shouldAlwaysShow property to true
     *
     * @return {Textarea}
     *
     */
    public alwaysShow() {
        this.shouldAlwaysShow = true

        return this
    }

    /**
     *
     * Set the number of rows on this textarea
     *
     * @return {Textarea}
     *
     */
    public rows(rowsCount: number) {
        this.rowsCount = rowsCount

        return this
    }
}
