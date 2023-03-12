import { Router } from "express";
import { Container, inject } from "inversify";
import { TYPES } from '../../../config/ioc/types';
import { isAuthenticated } from "../../../middleware/isAuthenticated";
import { UserController } from "../controllers/UserController";
import { createOrUpdateValidation } from "../validations/createOrUpdateValidation";

export class UserRoutes {
    private readonly _router: Router;

    constructor(@inject(TYPES.UserController) private readonly userController: UserController){
        this._router = Router();
        this.setRoutes();
    }

    private setRoutes(): void {
        this._router.use( isAuthenticated );
        this._router.get('/', this.userController.getUsers );
        // this._router.post('/', [ createOrUpdateValidation ] , this.userController.createUser);
        this._router.get('/:id', this.userController.getUser);
        this._router.put('/:id', [ createOrUpdateValidation ] , this.userController.updateUser);
        this._router.delete('/:id', this.userController.deleteUser);
    }

    public static init( container: Container ): Router {
        const userController = container.get<UserController>(TYPES.UserController);
        const userRoutes = new UserRoutes( userController );

        return userRoutes.router;
    }

    get router() {
        return this._router;
    }

}