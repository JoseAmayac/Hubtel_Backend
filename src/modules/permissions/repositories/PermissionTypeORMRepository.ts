import { inject, injectable } from 'inversify';
import { Permission } from '../entities/Permission';
import { IPermissionRepository } from '../interfaces/IPermissionRepository';
import { TYPES } from '../../../config/ioc/types';
import { DataSource } from 'typeorm';
import { TypeORMNameRepository } from '../../common/repositories/TypeORMNameRepository';
@injectable()
export class PermissionTypeORMRepository extends TypeORMNameRepository<Permission> implements IPermissionRepository{

    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource){
        super(dataSource, Permission);
    }

    async getEntitiesById(permissionsId: number[]): Promise<Permission[]> {
        const permissions = await this._repository.find({
            where: permissionsId.map(id => ({ id }))
        });

        if( permissions.length < permissionsId.length ){
            throw {
                name: 'INVALID_PERMISSIONS',
                message: 'One or more permissions does not exists'
            }
        }

        return permissions;
    }

}