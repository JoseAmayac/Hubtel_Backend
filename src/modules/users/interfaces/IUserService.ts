import { User } from '../entities/User';

export interface IUserService{
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User|null>;
    create(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    delete(id: number): Promise<void>;
}