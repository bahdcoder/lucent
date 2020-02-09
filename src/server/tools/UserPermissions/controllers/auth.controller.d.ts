import * as Express from 'express';
declare class AuthController {
    login(request: Express.Request, response: Express.Response): Promise<Express.Response>;
    /**
     * Fetch the authenticated user
     */
    me(request: Express.Request, response: Express.Response): Promise<Express.Response>;
}
export declare const Auth: AuthController;
export {};
