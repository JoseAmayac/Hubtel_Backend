import { inject, injectable } from 'inversify';
import { User } from '../../users/entities/User';
import { AuthUserDTO, AuthUserWithRolesDTO } from '../dtos/AuthUserDTO';
import { hashValue } from '../../../utils/hashValue';
import { AuthCreatedUserDTO } from '../dtos/AuthCreatedUserDTO';
import { AuthResponseDTO } from '../dtos/AuthResponseDTO';
import { generateToken } from '../helpers/generateToken';
import { TYPES } from '../../../config/ioc/types';
import { IAuthService } from '../interfaces/IAuthService';
import { IAuthRepository } from '../interfaces/IAuthRepository';
import { IRoleRepository } from '../../roles/interfaces/IRoleRepository';

@injectable()
export class AuthService implements IAuthService {
    constructor(@inject(TYPES.IAuthRepository) private authRepository: IAuthRepository,
                @inject(TYPES.IRolesRepository) private roleRepository: IRoleRepository){}


    async registerUser(user: AuthUserDTO): Promise<AuthCreatedUserDTO> {
        const role = await this.roleRepository.getEntityByName('USUARIO');
        if( !role ){
            throw new Error('ROLE_NOT_EXISTS');
        }
        
        const userWithRoles: AuthUserWithRolesDTO = {
            ...user,
            roles: [ role ],
            password: hashValue( user.password )
        }
        const { email, name, id } = await this.authRepository.createAuthUser(  userWithRoles );
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
        const [ token, refreshToken ] = generateToken({ id: user.id });
        
        return {
            user, token, refreshToken
        }
    }

    me({ id, email, name }: User ): AuthCreatedUserDTO {
        return { id, name, email };
    }

}