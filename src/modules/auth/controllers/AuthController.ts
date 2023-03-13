import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AuthService } from "../services/AuthService";
import { compareValues } from '../../../utils/compareValues';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import { User } from '../../users/entities/User';
import { TYPES } from '../../../config/ioc/types';

@injectable()
export class AuthController {
    constructor(@inject(TYPES.IAuthService) private authService: AuthService){}

    public login = async ( req: Request, res: Response, next: NextFunction ): Promise<Response | void > => {
        const { email, password } = req.body;

        try {
            const userDB: User|null = await this.authService.getByEmail( email );

            if( !userDB || !compareValues( password, userDB.password )){
                res.status(404);
                return next(new Error('Invalid email or password'));
            }else{
                const { email, name, id } = userDB;
                const response = this.authService.createResponse({ email, name, id });

                return res.status(201).json(response);
            }
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    register = async ( req: Request, res: Response, next: NextFunction ): Promise<Response|void> => {
        const userDTO: AuthUserDTO = req.body;
        
        try {
            const userExists = await this.authService.getByEmail( userDTO.email );
            if( userExists ) return res.status(400).json({message: 'User already exists'});

            const user = await this.authService.registerUser( userDTO );
            const response = this.authService.createResponse( user );
            return res.status(201).json(response);
        } catch (error: any) {
            if( error.name === 'INVALID_ROLES' ){
                return res.status(422).json({errors: [{ roles: error.message }]});
            }
            
            res.status(500);
            next( error );
        }
    }

    me = (req: Request, res: Response, next: NextFunction): Response|void => {
        try {
            const user = this.authService.me( req.user as User );
            return res.json({ user });
        } catch (error) {
            res.status(500);
            next( error );
        }
    }

    refresh = (req: Request, res: Response, next: NextFunction): Response => {
        if( !req.user ){
            return res.status(401).send("ERROR");
        }
        const { email, name, id } = req.user as User;
        const response = this.authService.createResponse({ email, name, id });

        return res.json( response );
    }
}