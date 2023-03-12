import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { QueryFailedError } from "typeorm";
import { TYPES } from '../../../config/ioc/types';
import { IUserService } from "../interfaces/IUserService";

@injectable()
export class UserController{
    constructor(@inject(TYPES.IUserService) private readonly userService: IUserService){}

    public getUsers = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAll();
            return res.status(200).json({ok: true, users});
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public getUser = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getById( +id );

            if( !user ) {
                res.status(404);
                return next(new Error('User not found'))
            }
            return res.status(200).json({ok: true, user});
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    public createUser = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const userDB = await this.userService.create( req.body );
            return res.status(200).json({ok: true, userDB});
        } catch (error) {
            res.status(500);
            if( error instanceof QueryFailedError){
                next( new Error('Error en el servidor') );
            }else{
                next( error );
            }
            
        }
    }

    public updateUser = async (req:Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.userService.update( +id, req.body );
            return res.status(204).json();
        } catch (error) {
            res.status(500);
            next( error );
        }       
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.userService.delete( +id );

            res.status(204).json();
        } catch (error) {
            res.status(500);
            next( error );
        }
    }
}