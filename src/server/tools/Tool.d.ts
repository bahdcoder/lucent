import * as Express from 'express';
import { ITools } from '../index.d';
export declare class Tool implements ITools {
    /**
     *
     * Define the scripts for this tool
     *
     * @type {string}
     *
     */
    private scripts;
    /**
     *
     * The express application
     *
     * @type {Express.Application}
     *
     */
    app: Express.Application | null;
    /**
     *
     * Define the name of the resource
     *
     * @type {string}
     *
     */
    id: string;
    /**
     *
     * Define the name of the tool
     *
     * @type {string}
     *
     */
    name: string;
    /**
     *
     * Set the name of the tool
     *
     * @type {string}
     *
     */
    withName(name: string): this;
    /**
     *
     * Define the styles for this tool
     *
     * @type {string}
     *
     */
    private styles;
    boot(app: Express.Application): void;
    /**
     *
     * Define the boot method for this tool
     *
     * @return {void}
     *
     */
    static(path: string): void;
    /**
     *
     * Add scripts to Lucent
     *
     * @return {void}
     *
     */
    js(name: string, path: string): this;
    /**
     * Add styles to Lucent
     *
     * @return {void}
     *
     */
    css(name: string, path: string): this;
}
