import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { RoleDTO } from '../dtos/RoleDTO';
import { IRoleService } from '../interfaces/IRoleService';
import { Role } from '../entities/Role';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/ioc/types';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { IPermissionRepository } from '../../permissions/interfaces/IPermissionRepository';

@injectable()
export class RolesService implements IRoleService {

    constructor(@inject(TYPES.IRolesRepository) private rolesRepository: IRoleRepository,
                @inject(TYPES.IPermissionRepository) private permissionRepository: IPermissionRepository  ){}

    getByName(name: string): Promise<RoleDTO|null> {
        return this.rolesRepository.getEntityByName( name );
    }

    getAll(): Promise<RoleDTO[]> {
        return this.rolesRepository.getEntities();
    }
    getById(id: number): Promise<RoleDTO|null> {
        return this.rolesRepository.getEntity(id);
    }
    async create(role: CreateRoleDTO): Promise<RoleDTO> {
        const permissions = await this.permissionRepository.getEntitiesById( role.permissions );
        const roleCreation = new Role();
        roleCreation.name = role.name;
        roleCreation.permissions = permissions;

        const roleDB = await this.rolesRepository.createEntity( roleCreation );

        return { ...roleDB }
    }
    async update(id: number,role: CreateRoleDTO): Promise<RoleDTO> {
        const roleToUpdate = new Role();
        roleToUpdate.name = role.name;
        const roleUpdated = await this.rolesRepository.updateEntity(id, roleToUpdate );
        return { ...roleUpdated };
    }
    async delete(id: number): Promise<void> {
        await this.rolesRepository.deleteEntity( id );
    }

}