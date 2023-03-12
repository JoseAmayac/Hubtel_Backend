import { ContainerModule } from "inversify";
import { IAuthService } from "../../../modules/auth/interfaces/IAuthService";
import { AuthService } from "../../../modules/auth/services/AuthService";
import { IRoleService } from "../../../modules/roles/interfaces/IRoleService";
import { RolesService } from "../../../modules/roles/services/RolesService";
import { IUserService } from "../../../modules/users/interfaces/IUserService";
import { TYPES } from "../types";
import { UserService } from '../../../modules/users/services/UserService';
import { IPermissionService } from "../../../modules/permissions/interfaces/IPermissionService";
import { PermissionService } from "../../../modules/permissions/services/PermissionService";
import { IRouteService } from "../../../modules/routes/interfaces/IRouteService";
import { RouteService } from "../../../modules/routes/services/RouteService";

const serviceModule = new ContainerModule((bind) => {
    bind<IAuthService>(TYPES.IAuthService).to( AuthService );
    bind<IRoleService>(TYPES.IRolesService).to( RolesService );
    bind<IUserService>(TYPES.IUserService).to( UserService );
    bind<IPermissionService>(TYPES.IPermissionService).to( PermissionService );
    bind<IRouteService>(TYPES.IRouteService).to( RouteService );
});

export { serviceModule };