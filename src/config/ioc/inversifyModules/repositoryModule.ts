import { ContainerModule } from "inversify";
import { TYPES } from "../types";
import { AuthRepository } from "../../../modules/auth/repositories/AuthRepository";
import { IAuthRepository } from "../../../modules/auth/interfaces/IAuthRepository";
import { IRoleRepository } from "../../../modules/roles/interfaces/IRoleRepository";
import { IUserRepository } from '../../../modules/users/interfaces/IUserRepository';
import { RoleTypeORMRepository } from "../../../modules/roles/repositories/RoleTypeORMRepository";
import { UserTypeORMRepository } from "../../../modules/users/repositories/UserTypeORMRepository";
import { IPermissionRepository } from "../../../modules/permissions/interfaces/IPermissionRepository";
import { PermissionTypeORMRepository } from '../../../modules/permissions/repositories/PermissionTypeORMRepository';
import { IRouteRepository } from "../../../modules/routes/interfaces/IRouteRepository";
import { RouteTypeORMRepository } from "../../../modules/routes/repositories/RouteTypeORMRepository";

const repositoryModule = new ContainerModule((bind) =>{
    bind<IAuthRepository>(TYPES.IAuthRepository).to( AuthRepository );
    bind<IRoleRepository>(TYPES.IRolesRepository).to( RoleTypeORMRepository );
    bind<IUserRepository>(TYPES.IUserRepository).to( UserTypeORMRepository);
    bind<IPermissionRepository>(TYPES.IPermissionRepository).to( PermissionTypeORMRepository );
    bind<IRouteRepository>(TYPES.IRouteRepository).to( RouteTypeORMRepository );
});

export { repositoryModule } 