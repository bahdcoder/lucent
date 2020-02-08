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
        /**
         *
         * Register path as a source for static files
         *
         */
        app.use('/src/client/tools/dashboard', Express.static(Root.resolve('src/client/tools/dashboard')))

        /**
         *
         * Define the js for this tool
         *
         */
        this.js('dashboard', 'src/client/tools/dashboard/dashboard.js')

        /**
         *
         * Define the css for this tool
         *
         */
        this.css('dashboard', 'src/client/tools/dashboard/dashboard.css')
    }
}
