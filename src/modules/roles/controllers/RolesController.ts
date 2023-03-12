import { NextFunction, Request, Response } from 'express';
import { RolesService } from '../services/RolesService';
import { TYPES } from '../../../config/ioc/types';
import { inject, injectable } from 'inversify';
@injectable()
export class RolesController {
    constructor(@inject(TYPES.IRolesService) private rolesService: RolesService) {}

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const roles = await this.rolesService.getAll();
            return res.json({ roles });
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            const role = await this.rolesService.getById(+id);

            if( !role ) {
                res.status(404);
                return next(new Error('Role not found'));
            }

            return res.json({ role });
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const roleExists = await this.rolesService.getByName( req.body.name );
            if( roleExists ) {
                res.status(422);
                return next( new Error('Role already exists'));
            }
            
            const role = await this.rolesService.create( req.body );
            return res.json({ role });
        } catch (error: any) {
            if( error?.name === 'INVALID_PERMISSIONS'){
                res.status(422).json({
                    errors: [{
                        permissions: error.message
                    }]
                });
            }
            
            res.status(500);
            next( error );
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.rolesService.update(+id, req.body);
            return res.status(204).json({});
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.rolesService.delete( +id );
            return res.status(204).json();
        } catch (error) {
            res.status(500)
            next( error );
        }
    }

}