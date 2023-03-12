import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'hjosohoasdfo2y92@dho';
export const generateToken = ( payload: any ): string => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '2h',
    });

    // TODO: generar también el token de refresco con una duración más larga
}