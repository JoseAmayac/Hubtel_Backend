import { Router } from "express";
import { inject, Container } from 'inversify';
import { TYPES } from '../../../config/ioc/types';
import { PermissionController } from '../controllers/PermissionController';
import { isAuthenticated } from '../../../middleware/isAuthenticated';
import { createOrUpdatePermissionValidations } from "../validations/createOrUpdatePermissionValidations";

export class PermissionRoutes{
    private readonly _router: Router;
    
    constructor(@inject(TYPES.PermissionController) private readonly permissionController: PermissionController){
        this._router = Router();

        this.setRoutes();
    }

    private setRoutes(): void {
        this._router.use( isAuthenticated );
        this._router.get('/', this.permissionController.getAll );
        this._router.post('/',[ createOrUpdatePermissionValidations ], this.permissionController.create );
        this._router.get('/:id', this.permissionController.getById );
        this._router.put('/:id',[ createOrUpdatePermissionValidations ], this.permissionController.update );
        this._router.delete('/:id', this.permissionController.delete );
    }

    public static init(container: Container): Router {
        const permissionController = container.get<PermissionController>(TYPES.PermissionController);
        const permissionRoutes = new PermissionRoutes( permissionController );

        return permissionRoutes.router;
    }

    public get router(){
        return this._router;
    }

}