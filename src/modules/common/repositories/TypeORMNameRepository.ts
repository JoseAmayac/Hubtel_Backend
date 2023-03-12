import { injectable, unmanaged } from 'inversify';
import { DataSource, EntityTarget, FindManyOptions } from 'typeorm';
import { EntityBase } from '../entities/BaseEntity';
import { IBaseNameRepository } from '../interfaces/IBaseNameRepository';
import { TypeORMRepository } from './TypeORMRepository';

@injectable()
export class TypeORMNameRepository<T extends EntityBase<number>> extends TypeORMRepository<T> implements IBaseNameRepository<T>{

    constructor(dataSource: DataSource,
                @unmanaged() entityClass: EntityTarget<T>){
        super( dataSource, entityClass );
    }

    async getEntityByName(name: string): Promise<T | null> {
        const entities = await this._repository.find({ name } as FindManyOptions<T>);

        return (entities.length > 0 ) ? entities[0] : null;
    }

}