import { inject, injectable } from "inversify";
import { User } from "../entities/User";
import { IUserService } from "../interfaces/IUserService";
import { TYPES } from '../../../config/ioc/types';
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class UserService implements IUserService {

    constructor(@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository){}

    getAll(): Promise<User[]> {
        return this.userRepository.getEntities();
    }
    getById(id: number): Promise<User | null> {
        return this.userRepository.getEntity( id );
    }
    create(user: User): Promise<User> {
        return this.userRepository.createEntity( user );
    }
    update(id: number,user: User): Promise<User> {
        return this.userRepository.updateEntity(id,user);
    }
    async delete(id: number): Promise<void> {
        await this.userRepository.deleteEntity( id );
    }

}