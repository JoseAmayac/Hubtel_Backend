import { inject, injectable } from "inversify";
import { Route } from "../entities/Route";
import { IRouteService } from "../interfaces/IRouteService";
import { TYPES } from '../../../config/ioc/types';
import { IRouteRepository } from "../interfaces/IRouteRepository";
import { IPermissionRepository } from "../../permissions/interfaces/IPermissionRepository";
import { FormRouteDTO } from '../dto/FormRouteDTO';

@injectable()
export class RouteService implements IRouteService {

    constructor(@inject(TYPES.IRouteRepository) private readonly routeRepository: IRouteRepository,
                @inject(TYPES.IPermissionRepository) private readonly permissionRepository: IPermissionRepository){}

    getAll(): Promise<Route[]> {
        return this.routeRepository.getEntities();
    }
    getByName(name: string): Promise<Route | null> {
        return this.routeRepository.getEntityByName( name );
    }
    getById(id: number): Promise<Route | null> {
        return this.routeRepository.getEntity( id );
    }
    async create(routeForm: FormRouteDTO): Promise<Route> {
        const route = new Route();
        route.pathname = routeForm.pathname;
        route.module = routeForm.module
        route.description = routeForm.description;
        route.permissions = await this.permissionRepository.getEntitiesById( routeForm.permissions );
        return this.routeRepository.createEntity( route );
    }
    async update(id: number, route: FormRouteDTO): Promise<Route> {
        let routeExists = await this.getById( id );
        if( !routeExists ) throw new Error('No route to update');
        routeExists = {
            ...routeExists,
            ...route,
            permissions: await  this.permissionRepository.getEntitiesById( route.permissions )
        }
        return this.routeRepository.updateEntity( id, routeExists );
    }
    delete(id: number): Promise<void> {
        return this.routeRepository.deleteEntity( id );
    }

}