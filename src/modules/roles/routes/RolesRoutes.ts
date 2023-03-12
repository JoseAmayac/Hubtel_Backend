import { Router } from "express";
import { RolesController } from '../controllers/RolesController';
import { Container, inject } from "inversify";
import { TYPES } from '../../../config/ioc/types';
import { isAuthenticated } from '../../../middleware/isAuthenticated';
import { createOrUpdateValidations } from "../validations/createOrUpdateValidations";

export class RolesRouter {
    private _router: Router

    constructor(@inject(TYPES.AuthController) private rolesController: RolesController  ) {
        this._router = Router();
        this.setRoutes();
    }

    private setRoutes() : void {
        this._router.use( isAuthenticated );
        this._router.get('/', this.rolesController.getAll);
        this._router.post('/',[ createOrUpdateValidations ], this.rolesController.create);
        this._router.get('/:id', this.rolesController.getById);
        this._router.put('/:id', this.rolesController.update);
        this._router.delete('/:id', this.rolesController.delete);
    }

    get router(): Router{
        return this._router;
    }

    public static init = ( container: Container): Router => {
        const rolesController = container.get<RolesController>(TYPES.RolesController);
        const rolesRoutes = new RolesRouter( rolesController );

        return rolesRoutes.router;
    }
}