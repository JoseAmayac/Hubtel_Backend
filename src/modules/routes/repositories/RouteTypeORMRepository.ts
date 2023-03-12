import { inject, injectable } from "inversify";
import { TypeORMNameRepository } from "../../common/repositories/TypeORMNameRepository";
import { Route } from '../entities/Route';
import { IRouteRepository } from "../interfaces/IRouteRepository";
import { TYPES } from '../../../config/ioc/types';
import { DataSource } from "typeorm";

@injectable()
export class RouteTypeORMRepository extends TypeORMNameRepository<Route> implements IRouteRepository{

    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource){
        super(dataSource, Route);
    }
}