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
}