import { User } from '../../users/entities/User';
import { AuthUserDTO } from '../dtos/AuthUserDTO';

export interface IAuthRepository{
    getByEmail( email: string ): Promise<User|null>;
    createAuthUser( user: AuthUserDTO ): Promise<User>;
}