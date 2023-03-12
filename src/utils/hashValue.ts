import bcrypt, { genSaltSync } from 'bcrypt';

export const hashValue = ( value: string ): string => {
    const salt = genSaltSync( 10 );
    return bcrypt.hashSync(value, salt);
}