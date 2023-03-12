import { AuthCreatedUserDTO } from './AuthCreatedUserDTO';

export interface AuthResponseDTO{
    token: string;
    user: AuthCreatedUserDTO;
}