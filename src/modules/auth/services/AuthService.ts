import { inject, injectable } from 'inversify';
import { User } from '../../users/entities/User';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import { hashValue } from '../../../utils/hashValue';
import { AuthCreatedUserDTO } from '../dtos/AuthCreatedUserDTO';
import { AuthResponseDTO } from '../dtos/AuthResponseDTO';
import { generateToken } from '../helpers/generateToken';
import { TYPES } from '../../../config/ioc/types';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthRepository } from '../interfaces/IAuthRepository';

@injectable()
export class AuthService implements IAuthService {
    constructor(@inject(TYPES.IAuthRepository) private authRepository: IAuthRepository){}


    async registerUser(user: AuthUserDTO): Promise<AuthCreatedUserDTO> {
        user.password = hashValue( user.password );
        const { email, name, id } = await this.authRepository.createAuthUser(  user );
        const userCreated: AuthCreatedUserDTO  = {
            name,
            email,
            id
        }
        
        return userCreated;
    }
    
    getByEmail(email: string): Promise<User | null> {
        return this.authRepository.getByEmail(email);
    }

    createResponse( user: AuthCreatedUserDTO): AuthResponseDTO{
        const token = generateToken({ id: user.id });
        
        return {
            user, token
        }
    }

    me({ id, email, name }: User ): AuthCreatedUserDTO {
        return { id, name, email };
    }

}