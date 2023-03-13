import { NextFunction, Request, Response } from "express";
import getContainer from "../config/ioc/inversify.config";
import { IRouteRepository } from "../modules/routes/interfaces/IRouteRepository";
import { TYPES } from '../config/ioc/types';
import { User } from '../modules/users/entities/User';
import { IUserRepository } from "../modules/users/interfaces/IUserRepository";

export const validateRoutePermissions = async( req: Request, res: Response, next: NextFunction ) => {
    const pathName = req.baseUrl;
    const routeRepository = getContainer().get<IRouteRepository>( TYPES.IRouteRepository );
    const userRepository = getContainer().get<IUserRepository>( TYPES.IUserRepository );
    const route = await routeRepository.getEntityByName( pathName );
    const { id }: User = req.user as User;
    const user = await userRepository.getEntity( id );
    const userPermissions: number[] = [];
    
    user?.roles.forEach( role => {
        role.permissions.forEach( permission => {
            userPermissions.push( permission.id );
        })
    });
    const hasPermission = route?.permissions.every( permission => userPermissions.includes( permission.id ));
    
    if( !hasPermission ){
        return res.status(401).json({
            ok: false, 
            message: 'You do not have permission to access this route',
            err: 'PERMISSION_DENIED'
        });
    }
    
    next();
}