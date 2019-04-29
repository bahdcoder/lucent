import Router from './Router'
import { Tool } from '../Tool'
import * as Express from 'express'
import * as Root from 'app-root-path'
import * as FileUpload from 'express-fileupload'

export class Resources extends Tool {
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
            '/pangaso-resources',
            Express.static(Root.resolve('pangaso-resources'))
        )

        /**
         * 
         * Define the file upload middleware
         * 
         */
        app.use(FileUpload())

        /**
         *
         * Register the routes for this tool
         *
         */
        app.use(Router)

        /**
         *
         * Define the js for this tool
         *
         */
        this.js('resources', 'pangaso-resources/tools/resources.js')

        /**
         *
         * Define the css for this tool
         *
         */
        this.css('resources', 'pangaso-resources/tools/resources.css')
    }
}
