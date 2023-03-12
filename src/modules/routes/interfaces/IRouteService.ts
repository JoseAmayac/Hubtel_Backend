import { Route } from "../entities/Route";

export interface IRouteService{
    getAll(): Promise<Route[]>;
    getByName(name: string): Promise<Route|null>;
    getById(id: number): Promise<Route|null>;
    create( route: Route ): Promise<Route>;
    update( id:number, route: Route ): Promise<Route>;
    delete( id: number ): Promise<void>;
}