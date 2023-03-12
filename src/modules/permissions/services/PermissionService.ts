import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/ioc/types';
import { Permission } from '../entities/Permission';
import { IPermissionRepository } from '../interfaces/IPermissionRepository';
import { IPermissionService } from '../interfaces/IPermissionService';

@injectable()
export class PermissionService implements IPermissionService{
    constructor(@inject(TYPES.IPermissionRepository) private readonly permissionRepository: IPermissionRepository) {}
    
    getByPermissionByName(name: string): Promise<Permission | null> {
        return this.permissionRepository.getEntityByName( name );
    }

    getPermissions(): Promise<Permission[]> {
        return this.permissionRepository.getEntities();
    }
    getPermission(id: number): Promise<Permission|null> {
        return this.permissionRepository.getEntity( id );
    }
    getPermissionsById(ids: number[]): Promise<Permission[]> {
        return this.permissionRepository.getEntitiesById( ids );
    }
    createPermission(permission: Permission): Promise<Permission> {
        return this.permissionRepository.createEntity( permission );
    }
    updatePermission(id: number, permission: Permission): Promise<Permission> {
        return this.permissionRepository.updateEntity(id, permission);
    }
    async deletePermission(id: number): Promise<void> {
        await this.permissionRepository.deleteEntity( id );
    }
}