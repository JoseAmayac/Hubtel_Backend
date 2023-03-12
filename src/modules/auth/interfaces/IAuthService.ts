import { User } from '../../users/entities/User';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import { AuthCreatedUserDTO } from '../dtos/AuthCreatedUserDTO';

export interface IAuthService {
    getByEmail( email: string ): Promise<User|null>;

    registerUser( user: AuthUserDTO ): Promise<AuthCreatedUserDTO>;
}