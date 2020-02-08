import { Field } from './Field';
export declare class Text extends Field {
    name: string;
    attribute: string;
    /**
     * Define the type of this field
     *
     * @var {String}
     *
     */
    type: string;
    /**
     * Initialize the Text field
     *
     * @param {string} name
     *
     * @return {void}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new Text
     *
     * @return {Text}
     *
     */
    static make(name: string, attribute?: string): Text;
}
