import { IBaseRepository } from "./IBaseRepository";

export interface IBaseNameRepository<T> extends IBaseRepository<T>{
    getEntityByName( name: string ): Promise<T|null>;
}