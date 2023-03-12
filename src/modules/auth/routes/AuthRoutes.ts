import { Router } from "express";
import { Container, inject } from "inversify";
import { AuthController } from '../controllers/AuthController';
import { TYPES } from '../../../config/ioc/types';
import { loginValidations } from "../validations/login.validations";
import { registerValidations } from "../validations/register.validations";
import { isAuthenticated } from '../../../middleware/isAuthenticated';

export class AuthRoutes {
    private _router: Router

    constructor(@inject(TYPES.AuthController) private authController: AuthController  ) {
        this._router = Router();
        this.setRoutes();
    }

    private setRoutes() : void {
        this._router.post('/login', [ loginValidations ], this.authController.login );
        this._router.post('/register',[ registerValidations ], this.authController.register );
        this._router.get('/me',[ isAuthenticated ], this.authController.me)
    }

    get router(): Router{
        return this._router;
    }

    public static init = ( container: Container ) => {
        const authController = container.get<AuthController>(TYPES.AuthController);
        const authRoutes = new AuthRoutes( authController );

        return authRoutes.router;
    }
}