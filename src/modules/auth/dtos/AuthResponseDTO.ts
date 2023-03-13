import { AuthCreatedUserDTO } from './AuthCreatedUserDTO';

export interface AuthResponseDTO{
    token: string;
    refreshToken: string;
    user: AuthCreatedUserDTO;
}