import { IAuthRepository } from '../interfaces/IAuthRepository';
import { User } from '../../users/entities/User';
import { Repository, DataSource } from 'typeorm';
import { inject, injectable } from 'inversify';
import { AuthUserWithRolesDTO } from '../dtos/AuthUserDTO';
import { TYPES } from '../../../config/ioc/types';

@injectable()
export class AuthRepository implements IAuthRepository {
    private readonly authRepository: Repository<User>;

    constructor(@inject(TYPES.TypeORMDataSource) datasource: DataSource){
        this.authRepository = datasource.getRepository( User );
    }

    getByEmail(email: string): Promise<User|null> {
        return this.authRepository.findOneBy({ email })
    }
    
    async createAuthUser(authUser: AuthUserWithRolesDTO): Promise<User> {
        const user = new User();
        user.name = authUser.name;
        user.email = authUser.email;
        user.password = authUser.password;
        user.roles = authUser.roles;

        return await this.authRepository.save( user );
    }
}