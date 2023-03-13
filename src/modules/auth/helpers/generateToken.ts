import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'hjosohoasdfo2y92@dho';
const REFRESH_KEY = process.env.REFRESH_KEY || 'odpfjasopfjopasdjfopjasdopff5f6s5f6@hioa890y'
export const generateToken = ( payload: any ): string[] => {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10min'});
    const refreshToken = jwt.sign( payload, REFRESH_KEY ,{ expiresIn: '24h'})

    return [ token, refreshToken];
}