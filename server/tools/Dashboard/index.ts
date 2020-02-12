import * as Path from 'path'
import { Tool } from '../Tool'
import * as Express from 'express'
import * as Root from 'app-root-path'

export class Dashboard extends Tool {
    /**
     * Boot the resources tool
     *
     * @return {void}
     *
     */
    public boot(app: Express.Application) {
        super.boot(app)

        /**
         *
         * Define the js for this tool
         *
         */
        this.js('/lucent/dashboard/dashboard.js', Path.join(__dirname, '..', '..', '..', '/client/tools/dashboard/dashboard.js'))

        /**
         *
         * Define the css for this tool
         *
         */
        this.css('/lucent/dashboard/dashboard.css', Path.join(__dirname, '..', '..', '..', '/client/tools/dashboard/dashboard.css'))
    }
}
