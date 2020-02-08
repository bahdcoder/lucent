import * as Express from 'express'
import * as ChangeCase from 'change-case'
import { ITools, IAsset } from '../index.d'

export class Tool implements ITools {
    /**
     *
     * Define the scripts for this tool
     *
     * @type {string}
     *
     */
    private scripts: IAsset[] = []

    /**
     *
     * The express application
     *
     * @type {Express.Application}
     *
     */
    public app: Express.Application | null = null

    /**
     *
     * Define the name of the resource
     *
     * @type {string}
     *
     */
    public id: string = ChangeCase.camelCase(this.constructor.name)

    /**
     *
     * Define the name of the tool
     *
     * @type {string}
     *
     */
    public name: string = ChangeCase.sentenceCase(this.constructor.name)

    /**
     *
     * Set the name of the tool
     *
     * @type {string}
     *
     */
    public withName(name: string) {
        this.name = name

        return this
    }

    /**
     *
     * Define the styles for this tool
     *
     * @type {string}
     *
     */
    private styles: IAsset[] = []

    public boot(app: Express.Application) {
        this.app = app
    }

    /**
     *
     * Define the boot method for this tool
     *
     * @return {void}
     *
     */
    public static(path: string): void {
        if (!this.app) {
            return
        }

        this.app.use(Express.static(path))
    }

    /**
     *
     * Add scripts to Lucent
     *
     * @return {void}
     *
     */
    public js(name: string, path: string) {
        this.scripts = [...this.scripts, { name, path }]

        return this
    }

    /**
     * Add styles to Lucent
     *
     * @return {void}
     *
     */
    public css(name: string, path: string) {
        this.styles = [...this.styles, { name, path }]

        return this
    }
}
