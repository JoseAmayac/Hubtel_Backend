import { inject, injectable } from "inversify";
import { TypeORMRepository } from "../../common/repositories/TypeORMRepository";
import { User } from '../entities/User';
import { IUserRepository } from "../interfaces/IUserRepository";
import { TYPES } from '../../../config/ioc/types';
import { DataSource } from "typeorm";

@injectable()
export class UserTypeORMRepository extends TypeORMRepository<User> implements IUserRepository{

    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource){
        super(dataSource, User);
    }

    // getEntity( id: number ): Promise<User|null>{
    //     return this._repository.findOneBy(id, {
    //         relations: {
    //             roles: true
    //         }
    //     })
    // }

}