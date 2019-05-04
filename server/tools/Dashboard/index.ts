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
        app.use(
            '/pangaso-dashboard',
            Express.static(Root.resolve('pangaso-dashboard'))
        )

        /**
         *
         * Define the js for this tool
         *
         */
        this.js('resources', 'pangaso-dashboard/tools/dashboard.js')

        /**
         *
         * Define the css for this tool
         *
         */
        this.css('resources', 'pangaso-dashboard/tools/dashboard.css')
    }
}
