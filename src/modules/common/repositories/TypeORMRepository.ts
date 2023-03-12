import { injectable, unmanaged } from "inversify";
import { DataSource, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import { EntityBase } from "../entities/BaseEntity";
import { IBaseRepository } from '../interfaces/IBaseRepository';

@injectable()
export abstract class TypeORMRepository<T extends EntityBase<number>> implements IBaseRepository<T>{
    protected readonly _repository: Repository<T>
    
    constructor(dataSource: DataSource,
                @unmanaged() entityClass: EntityTarget<T>){
        this._repository = dataSource.getRepository( entityClass );
    }

    getEntities(): Promise<T[]> {
        return this._repository.find();
    }
    getEntity(id: number): Promise<T | null> {
        return this._repository.findOneBy({ id } as FindOptionsWhere<T>);
    }
    createEntity(entityBody: T): Promise<T> {
        const newEntity  = this._repository.create( entityBody );
        return this._repository.save( newEntity );
    }
    async updateEntity(entityId: number, entityBody: T): Promise<T> {
        const entityDB = await this.getEntity( entityId ); 
        if( !entityDB ) throw new Error("Not entity found to update");
        
        Object.assign(entityDB, entityBody);
        return this._repository.save( entityDB );
    }

    async deleteEntity(entityId: number): Promise<void> {
        await this._repository.delete( entityId );
    }


}