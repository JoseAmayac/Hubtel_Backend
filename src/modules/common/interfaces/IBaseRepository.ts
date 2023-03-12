
export interface IBaseRepository<T> {
    getEntities(): Promise<T[]>;
    getEntity(entityId: number): Promise<T|null>;
    createEntity( entityBody: T): Promise<T>
    updateEntity(entityId: number, entityBody: T): Promise<T>
    deleteEntity(entityId: number): Promise<void>
}