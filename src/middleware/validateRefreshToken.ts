import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const REFRESH_KEY = process.env.REFRESH_KEY || 'odpfjasopfjopasdjfopjasdopff5f6s5f6@hioa890y'
export const validateRefreshToken = ( req: Request, res: Response, next: NextFunction ) => {
    const { authorization: token } = req.headers;

    if( !token ) return res.status( 401 ).json({ err: 'NO_REFRESH_TOKEN', message: "Invalid refresh token"});

    try {
        const authToken = token.split(' ')[1]
        const decoded  = jwt.verify( authToken, REFRESH_KEY )
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, err: 'INVALID_TOKEN', message: "Invalid or expired refresh token"});
    }
}