import { IBaseNameRepository } from "../../common/interfaces/IBaseNameRepository";
import { IBaseRepository } from "../../common/interfaces/IBaseRepository";
import { Permission } from '../entities/Permission';

export interface IPermissionRepository extends IBaseNameRepository<Permission>{
    getEntitiesById(permissionsId: number[]): Promise<Permission[]>;
}