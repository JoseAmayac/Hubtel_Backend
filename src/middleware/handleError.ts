import { NextFunction, Request, Response } from "express";

export const handleError = ( err: Error, _req: Request, res: Response, next: NextFunction ) => {
    
    if( err instanceof Error){
        const status = res.statusCode || 500;
        const message = err.message || 'Error en el servidor';
        
        return res.status(status).json({ error: message });
        
    }

    next( err );
}