import { inject, injectable } from "inversify";
import crypto from 'crypto';
import { User } from "../entities/User";
import { IUserService } from "../interfaces/IUserService";
import { TYPES } from '../../../config/ioc/types';
import { IUserRepository } from "../interfaces/IUserRepository";
import { FormUserDTO, CreationUserDTO } from '../dtos/FormUserDTO';

@injectable()
export class UserService implements IUserService {

    constructor(@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository){}

    getAll(): Promise<User[]> {
        return this.userRepository.getEntities();
    }
    getById(id: number): Promise<User | null> {
        return this.userRepository.getEntity( id );
    }
    create(userDTO: FormUserDTO): Promise<User> {
        const userCreation: CreationUserDTO = {
            ...userDTO,
            password: crypto.randomBytes(16).toString('hex'),
            roles: userDTO.roles.map( id => ({ id }))
        };

        return this.userRepository.createEntity( userCreation as User );
    }
    update(id: number,userDTO: FormUserDTO): Promise<User> {
        const user = new User();

        return this.userRepository.updateEntity(id,user);
    }
    async delete(id: number): Promise<void> {
        await this.userRepository.deleteEntity( id );
    }

}