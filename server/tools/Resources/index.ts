import * as Path from 'path'
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
        super.boot(app)

        /**
         *
         * Register storage path as a source for static files.
         * TODO: this should be the config for storage
         * folder defined by user.
         *
         */
        app.get(
            '/storage/*',
            (request: Express.Request, response: Express.Response) => {
                return response.sendFile(
                    // @ts-ignore
                    `${Path.dirname(require.main.filename)}/${request.path}`
                )
            }
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
        this.js('/lucent/resources/resources.js', Path.join(__dirname, '..', '..', '..', '/client/tools/resources/resources.js'))

        /**
         *
         * Define the css for this tool
         *
         */
        this.css('/lucent/resources/resources.css', Path.join(__dirname, '..', '..', '..', '/client/tools/resources/resources.css'))
    }
}
