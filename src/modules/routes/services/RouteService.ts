import { inject, injectable } from "inversify";
import { Route } from "../entities/Route";
import { IRouteService } from "../interfaces/IRouteService";
import { TYPES } from '../../../config/ioc/types';
import { IRouteRepository } from "../interfaces/IRouteRepository";

@injectable()
export class RouteService implements IRouteService {

    constructor(@inject(TYPES.IRouteRepository) private readonly routeRepository: IRouteRepository){}

    getAll(): Promise<Route[]> {
        return this.routeRepository.getEntities();
    }
    getByName(name: string): Promise<Route | null> {
        return this.routeRepository.getEntityByName( name );
    }
    getById(id: number): Promise<Route | null> {
        return this.routeRepository.getEntity( id );
    }
    create(route: Route): Promise<Route> {
        return this.routeRepository.createEntity( route );
    }
    async update(id: number, route: Route): Promise<Route> {
        const routeExists = await this.getById( id );
        if( !routeExists ) throw new Error('No route to update');
        
        return this.routeRepository.updateEntity( id, route );
    }
    delete(id: number): Promise<void> {
        return this.routeRepository.deleteEntity( id );
    }

}