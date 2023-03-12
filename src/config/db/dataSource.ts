import { DataSource, DataSourceOptions } from "typeorm";
import { dbConfig } from "./dbCredentials";
import { User } from '../../modules/users/entities/User';
import { Role } from '../../modules/roles/entities/Role';
import { Permission } from '../../modules/permissions/entities/Permission';
import { Route } from '../../modules/routes/entities/Route';
export type databaseType = 'mysql' | 'postgres'

const options: DataSourceOptions = {
    type: dbConfig.dialect as databaseType,
    host: dbConfig.host,
    port: Number( dbConfig.port ),
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    synchronize: true,
    logging: false,
    entities: [ User, Role, Permission, Route ],
    // autoLoadEntities: true
}

export const AppDataSource = new DataSource(options);