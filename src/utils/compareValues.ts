import bcrypt from 'bcrypt';

export const compareValues = ( plain: string, hashed: string ): boolean => {
    return bcrypt.compareSync( plain, hashed );
}