import { Router } from "express";
import { Container, inject } from "inversify";
import { TYPES } from '../../../config/ioc/types';
import { isAuthenticated } from "../../../middleware/isAuthenticated";
import { RouteController } from "../controllers/RouteController";

export class RouteRoutes {
  private readonly _router: Router;
  constructor(
    @inject(TYPES.RouteController)
    private readonly routeController: RouteController
  ) {
    this._router = Router();
    this.setRoutes();
  }

  private setRoutes(): void {
    this._router.use(isAuthenticated);
    this._router.get("/", this.routeController.getRoutes);
    this._router.get("/:id", this.routeController.getById);
    this._router.post("/", this.routeController.create);
    this._router.put("/:id", this.routeController.update);
    this._router.delete("/:id", this.routeController.delete);
  }

  public static init(container: Container): Router{
    const routeController = container.get<RouteController>(TYPES.RouteController);
    const routeRoutes = new RouteRoutes( routeController );
    return routeRoutes._router;
  }

  public get router(){
    return this._router;
  }
}
