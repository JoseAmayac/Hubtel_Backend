import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from '../../../config/ioc/types';
import { IRouteService } from "../interfaces/IRouteService";

@injectable()
export class RouteController{

    constructor(@inject(TYPES.IRouteService) private readonly routeService: IRouteService){}

    public getRoutes = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const routes = await this.routeService.getAll();
            return res.json({ ok: true, routes });
        } catch (error) {
            res.status( 500 );
            return next( error );
        }
    }

    public getById  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const route = await this.routeService.getById( +id );

            if( !route ){
                res.status( 404 );
                return next( new Error('Route not found') );
            }

            return res.json({ ok: true, route });
        } catch (error) {
            res.status( 500 );
            next( error );
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {            
            const routeExists = await this.routeService.getByName( req.body.pathname );
            if( routeExists ) {
                return res.status(422).json({errors: [{ name: 'Route already exists' }]});
            }

            const routeDB = await this.routeService.create( req.body );
            return res.json({ok: true, route: routeDB });
        } catch (error) {
            res.status( 500 );
            next( error );
        }
    }

    public update =  async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.routeService.update( +id, req.body );
            return res.status(204).json();
        } catch (error) {
            res.status( 500 );
            next( error );
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const { id } = req.params;
            await this.routeService.delete( +id );
            return res.status(204).json();
        } catch (error) {
            res.status( 500 );
            next( error );
        }
    }
}