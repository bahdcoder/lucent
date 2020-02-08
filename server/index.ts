import * as Fs from 'fs'
import * as Path from 'path'
import * as Express from 'express'
import * as Edge from 'express-edge'
import LucentRouter from './Router'
import * as Root from 'app-root-path'
import { MongoClient } from 'mongodb'
import * as BodyParser from 'body-parser'
import { Dashboard } from './tools/Dashboard'
import { Resources } from './tools/Resources'
import { Connection, Database } from './Database'
import { IResource, ITools, IAsset } from './index.d'

export class Lucent {
    /**
     * The path for all resources
     *
     * @type {String}
     *
     */
    private resourcesPath: string = `${process.cwd()}/lucent`

    /**
     *
     * Define scripts for Lucent
     *
     * @type {array}
     *
     */
    private static scripts: IAsset[] = []

    /**
     *
     * Define styles for Lucent
     *
     * @type {array}
     *
     */
    private static styles: IAsset[] = []

    /**
     *
     * Define the client
     *
     * @type {MongoClient}
     *
     */
    private mongoClient: MongoClient | null = null

    /**
     *
     * Defines the port on which Lucent should run on
     *
     * @type {number}
     *
     */
    private port: number | null = null

    /**
     *
     * The name of the database
     *
     * @type {string}
     *
     */
    private databaseName: string = ''

    /**
     *
     * The database connection
     *
     * @type {Any}
     *
     */
    private connection: any = ''

    /**
     *
     * Define the default tools that come
     * with Lucent
     *
     * @type {Array}
     *
     */
    private tools: ITools[] = [new Dashboard(), new Resources()]

    /**
     *
     * The express instance for Lucent
     *
     * @type {Express.Application}
     *
     */
    private expressInstance: Express.Application

    /**
     * Define the Lucent router
     *
     * @type {Router}
     *
     */
    private router: Express.Router = LucentRouter

    /**
     *
     * Lucent resources
     *
     * @type {Array}
     *
     */
    private resources: IResource[] = []

    /**
     * Determine if Lucent has already been initialized
     *
     * @type {Boolean}
     *
     */
    private initialized: boolean = false

    /**
     *
     * Define the database connection
     *
     * @type {Database}
     *
     */
    private database: Database = Connection

    /**
     *
     * Initialize Lucent
     *
     */
    public constructor() {
        /**
         *
         * Initialize express instance
         *
         */
        this.expressInstance = Express()

        /**
         *
         * Register the body parser middleware
         *
         */
        this.expressInstance.use(BodyParser.json())

        /**
         *
         * Make the Lucent application
         *
         */
        this.expressInstance.use(this.make())
    }

    /**
     *
     * Set the database client for mongo
     *
     * @param uri set the database uri and database name
     * @param database set the database uri and database name
     *
     * @return {Lucent}
     *
     */
    public mongo(uri: string, database: string) {
        this.databaseName = database

        this.mongoClient = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return this
    }

    /**
     *
     * Load all resources from the resources path
     *
     * @return {void}
     *
     */
    private loadResources(): void {
        if (this.initialized) return

        this.initialized = true

        try {
            /**
             *
             * Fetch all files (and unfortunately, folders) in resource path
             *
             */
            let files = Fs.readdirSync(this.resourcesPath)

            /**
             *
             * Get only files ending in .js
             *
             */
            files = files.filter(
                file => file.substring(file.length - 3) === '.js'
            )

            /**
             *
             * Foreach of those files, require and load the resource
             *
             */
            files.forEach((file: string) => {
                /**
                 *
                 * Require the resource export
                 *
                 */
                const resource = require(`${this.resourcesPath}/${file}`)

                /**
                 * Create and push a new instance of the resource.
                 * This adds support for resources exported
                 * using the ES6 import/export syntax.
                 *
                 */
                if (resource.default) {
                    return this.resources.push(new resource.default())
                }

                /**
                 *
                 * Create and push a new instance of a resource
                 *
                 */
                this.resources.push(new resource())
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Get the user resource
     *
     * @return {IResource}
     *
     */
    private getUserResource(): IResource {
        /**
         *
         * Find a resource called UserResource. This is for
         * cases when authentication is added to
         * the Lucent dashboard.
         *
         */
        const resource: any = this.resources.find((resource: IResource) => {
            if (resource && resource.name) {
                return resource.name() === 'User'
            }

            return false
        })

        /**
         *
         * Only throw this error if authentication is turned on
         * but a user resource is not defined
         *
         */
        if (!resource) {
            // throw new Error('User Resource must be defined.')
        }

        return resource
    }

    /**
     *
     * Make the Lucent middleware
     *
     * @return {Function}
     *
     */
    public make() {
        return (
            req: Express.Request,
            res: Express.Response,
            next: Express.NextFunction
        ): void => {
            this.loadResources()

            req.lucent = {
                tools: this.tools,
                router: this.router,
                database: this.database,
                resources: this.resources,
                userResource: this.getUserResource()
            }

            next()
        }
    }

    /**
     *
     * Return the Lucent router
     *
     * @return {Express.Router}
     *
     */
    public routes() {
        return this.router
    }

    /**
     * Register the static assets for Lucent
     *
     * @return {void}
     *
     */
    public assets() {
        return Express.static(Path.resolve(__dirname, Root.path, 'public'))
    }

    /**
     *
     * Set the port
     *
     * @return {Lucent}
     *
     */
    public onPort(port: number) {
        this.port = port

        return this
    }

    /**
     *
     * Define the tools to be added to Lucent
     *
     * @return {Lucent}
     *
     */
    public withTools(tools: ITools[]): Lucent {
        this.tools = [...this.tools, ...tools]

        return this
    }

    /**
     *
     * Boot all tools for Lucent
     *
     * @return {void}
     *
     */
    public bootTools() {
        this.tools.forEach((tool: ITools) => tool.boot(this.expressInstance))
    }

    /**
     * Start the express server
     *
     * @return {void}
     *
     */
    public start() {
        if (!this.mongoClient) {
            return this
        }

        if (!this.port) {
            return this
        }

        /**
         *
         *
         * Register all the tools for Lucent
         *
         *
         */
        this.bootTools()

        /**
         *
         * Register the assets for project
         *
         */
        this.expressInstance.use('/public', this.assets())

        /**
         *
         * Register the edge templating engine
         *
         */
        this.expressInstance.use(Edge)

        /**
         *
         * Set the root path for views
         *
         */
        this.expressInstance.set(
            'views',
            Path.resolve(__dirname, Root.path, 'public')
        )

        /**
         *
         * Register the express routes
         *
         */
        this.expressInstance.use(this.routes())

        /**
         *
         * Connect to the mongo client
         *
         */
        this.mongoClient
            .connect()
            /**
             *
             * After connected successfully, start
             * express server
             *
             */
            .then(() => {
                //@ts-ignore
                this.database.set(this.mongoClient.db(this.databaseName))

                this.expressInstance.listen(this.port, () => {
                    console.log(
                        `Lucent running on port http://localhost:${this.port}`
                    )
                })
            })
            /**
             *
             * Handle any errors from connecting to database
             * or starting the server
             *
             */
            .catch(error => {
                console.error(error)
            })
    }

    /**
     * Add scripts to Lucent
     *
     * @return {void}
     *
     */
    public static script(name: string, path: string): Lucent {
        Lucent.scripts = [...Lucent.scripts, { name, path }]

        return new Lucent()
    }

    /**
     * Add styles to Lucent
     *
     * @return {void}
     *
     */
    public static style(name: string, path: string): Lucent {
        Lucent.styles = [...Lucent.styles, { name, path }]

        return new Lucent()
    }
}
