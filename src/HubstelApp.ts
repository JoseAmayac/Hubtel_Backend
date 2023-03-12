import express, { Application, Router } from "express";
import cors from 'cors';
import getContainer from "./config/ioc/inversify.config";
import { AuthRoutes } from './modules/auth/routes/AuthRoutes';
import { RolesRouter } from "./modules/roles/routes/RolesRoutes";
import { UserRoutes } from './modules/users/routes/UserRoutes';
import { PermissionRoutes } from './modules/permissions/routes/PermissionRoutes';
import { handleError } from "./middleware/handleError";
import { RouteRoutes } from "./modules/routes/routes/RouteRoutes";

class HubstelApp {
    private app: Application;

    constructor() {
        this.app = express();
        this.useMiddleware();
        this.useRoutes();
    }

    private useMiddleware(): void {
        this.app.use( cors() );
        this.app.use( express.json() );
        
    }

    private useRoutes(): void {
        const container = getContainer();
        
        this.app.use('/api/auth', AuthRoutes.init( container ));
        this.app.use('/api/roles', RolesRouter.init( container ));
        this.app.use('/api/users', UserRoutes.init( container ));
        this.app.use('/api/permissions', PermissionRoutes.init( container ));
        this.app.use('/api/routes', RouteRoutes.init( container ));
        this.app.use( handleError );
    }

    public listen( port: number ): void {
        this.app.listen( port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

export default HubstelApp;