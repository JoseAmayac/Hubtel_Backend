import { inject, injectable } from "inversify";
import { Route } from '../entities/Route';
import { IRouteRepository } from "../interfaces/IRouteRepository";
import { TYPES } from '../../../config/ioc/types';
import { DataSource, FindManyOptions } from "typeorm";
import { TypeORMRepository } from "../../common/repositories/TypeORMRepository";

@injectable()
export class RouteTypeORMRepository extends TypeORMRepository<Route> implements IRouteRepository{

    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource){
        super(dataSource, Route);
    }

    async getEntityByName(name: string): Promise<Route | null> {
        const routes = await this._repository.find({ 
            where: {
                pathname: name
            }
        } as FindManyOptions<Route>);
        
        return routes.length > 0 ? routes[0] : null;
    }
}