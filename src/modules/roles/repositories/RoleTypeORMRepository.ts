import { IRoleRepository } from '../interfaces/IRoleRepository';
import { Role } from '../entities/Role';
import { DataSource } from 'typeorm';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/ioc/types';
import { TypeORMNameRepository } from '../../common/repositories/TypeORMNameRepository';

@injectable()
export class RoleTypeORMRepository extends TypeORMNameRepository<Role> implements IRoleRepository {
    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource ){
        super( dataSource, Role );
    }

    async getEntitiesById(rolesId: number[]): Promise<Role[]> {
        const roles = await this._repository.find({ 
            where: rolesId.map( id => ({id}) )
        });

        if( roles.length < rolesId.length ) {
            throw {
                name: 'INVALID_ROLES',
                message: 'One or more roles does not exist'
            }
        }

        return roles;
    }
}