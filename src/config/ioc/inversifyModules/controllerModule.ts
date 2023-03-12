import { ContainerModule } from "inversify";
import { AuthController } from "../../../modules/auth/controllers/AuthController";
import { TYPES } from "../types";
import { RolesController } from '../../../modules/roles/controllers/RolesController';
import { UserController } from '../../../modules/users/controllers/UserController';
import { PermissionController } from '../../../modules/permissions/controllers/PermissionController';
import { RouteController } from "../../../modules/routes/controllers/RouteController";

const controllerModule = new ContainerModule((bind) => {
    bind<AuthController>(TYPES.AuthController).to( AuthController );
    bind<RolesController>(TYPES.RolesController).to( RolesController );
    bind<UserController>(TYPES.UserController).to( UserController );
    bind<PermissionController>(TYPES.PermissionController).to( PermissionController );
    bind<RouteController>(TYPES.RouteController).to( RouteController );
})

export { controllerModule }