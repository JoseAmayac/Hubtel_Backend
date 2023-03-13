import { FormRouteDTO } from "../dto/FormRouteDTO";
import { Route } from "../entities/Route";

export interface IRouteService{
    getAll(): Promise<Route[]>;
    getByName(name: string): Promise<Route|null>;
    getById(id: number): Promise<Route|null>;
    create( route: FormRouteDTO ): Promise<Route>;
    update( id:number, route: FormRouteDTO ): Promise<Route>;
    delete( id: number ): Promise<void>;
}