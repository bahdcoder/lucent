import { Field } from './Field';
export declare class File extends Field {
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
     * Initialize the File field
     *
     * @param {string} name
     *
     * @return {File}
     *
     */
    constructor(name: string, attribute?: string);
    /**
     *
     * Make a new File
     *
     * @return {File}
     *
     */
    static make(name: string, attribute?: string): File;
}
