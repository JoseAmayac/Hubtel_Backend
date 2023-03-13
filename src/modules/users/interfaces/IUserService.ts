import { FormUserDTO } from '../dtos/FormUserDTO';
import { User } from '../entities/User';

export interface IUserService{
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User|null>;
    create(user: FormUserDTO): Promise<User>;
    update(id: number, user: FormUserDTO): Promise<User>;
    delete(id: number): Promise<void>;
}