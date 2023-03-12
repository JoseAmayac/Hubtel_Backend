import { RoleDTO } from '../dtos/RoleDTO';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';

export interface IRoleService {
    getAll(): Promise<RoleDTO[]>;
    getById(id: number): Promise<RoleDTO|null>;
    getByName( name: string ): Promise<RoleDTO|null>;
    create(role: CreateRoleDTO): Promise<RoleDTO>;
    update(id: number, role: CreateRoleDTO): Promise<RoleDTO>;
    delete(id: number): Promise<void>;
}