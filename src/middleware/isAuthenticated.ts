import { NextFunction, Request, Response } from "express";
import passport from './passport';

export const isAuthenticated = ( req: Request, res: Response, next: NextFunction ) => {
    passport.authenticate('jwt', {session: false}, ( err: any, user: any, info: any ) => {
        if( info ) return handleAuthError( info, res );

        if( err || !user ) return handleAuthError( err, res );
        req.user = user;
        next();
    })(req, res, next);
}

const handleAuthError = (err: Error | null | undefined, res: Response) => {
    if(err instanceof Error){
        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ success: false, err: 'TOKEN_INVALID',message: 'Token inválido' });
        }
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ success: false, err: 'TOKEN_EXPIRED', message: 'Token expirado' });
        }

    }
    return res.status(401).json({ ok: false, err: 'ERROR', message: 'Error de autenticación' });
};