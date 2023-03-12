import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/ioc/types';
import { PermissionService } from '../services/PermissionService';

@injectable()
export class PermissionController{
    constructor(@inject(TYPES.IPermissionService) private readonly permissionService: PermissionService){}

    public getAll = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const permissions = await this.permissionService.getPermissions();
            return res.json({ ok: true, permissions});
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public getById = async(req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            const permission = await this.permissionService.getPermission( +id );
            if( !permission ){
                res.status(404);
                return next( new Error('Permission not found') );
            }

            return res.json({ ok: true, permission });
        } catch (error) {
            
        }
    }

    public create  = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { name } = req.body;
            const permissionExists = await this.permissionService.getByPermissionByName( name );
            if( permissionExists ) {
                res.status(422);
                return next( new Error('Permissions Already Exists'));
            }

            const permissionDB = await this.permissionService.createPermission( req.body );
            return res.json({ ok: true, permissionDB });
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.permissionService.updatePermission( +id, req.body );
            return res.status(204).json();
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.permissionService.deletePermission( +id )
            return res.status(204).json();
        } catch (error) {
            res.status(500);
            next( error );
        }
    }
}