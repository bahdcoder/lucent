import { Tool } from '../Tool'
import * as Express from 'express'
import * as Root from 'app-root-path'

import Router from './Router'

export class UserPermissions extends Tool {
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
            '/src/client/tools/user-permissions',
            Express.static(Root.resolve('src/client/tools/user-permissions'))
        )

        app.use(Router)

        /**
         *
         * Define the js for this tool
         *
         */
        this.js(
            'user-permissions',
            'src/client/tools/user-permissions/user-permissions.js'
        )

        /**
         *
         * Define the css for this tool
         *
         */
        this.css(
            'user-permissions',
            'src/client/tools/user-permissions/user-permissions.css'
        )
    }
}
