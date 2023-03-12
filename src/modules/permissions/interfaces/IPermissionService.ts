import { Permission } from '../entities/Permission';

export interface IPermissionService {
    getPermissions(): Promise<Permission[]>
    getPermission( id: number ): Promise<Permission|null>;
    getPermissionsById( ids: number[] ): Promise<Permission[]>
    getByPermissionByName( name: string ): Promise<Permission|null>;
    createPermission( permission: Permission ): Promise<Permission>;
    updatePermission( id: number, permission: Permission ): Promise<Permission>;
    deletePermission( id: number ): Promise<void>;
}