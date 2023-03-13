import { User } from '../../users/entities/User';
import { AuthUserWithRolesDTO } from '../dtos/AuthUserDTO';

export interface IAuthRepository{
    getByEmail( email: string ): Promise<User|null>;
    createAuthUser( user: AuthUserWithRolesDTO ): Promise<User>;
}