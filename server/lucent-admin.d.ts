declare namespace Express {
    export interface Request {
        lucent: {
            resources: any
            router: any
            database: any
            userResource: any
            resource?: any
            tools: any
        }
    }

    export interface Application {
        start?: Function
    }
}

declare module 'indicative'

declare module 'edge.js'

declare module 'express-edge'
