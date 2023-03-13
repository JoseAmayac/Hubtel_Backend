import { Role } from '../../roles/entities/Role';
export interface AuthUserDTO{
    name: string;
    email: string;
    password: string;
}

export interface AuthUserWithRolesDTO{
    name: string;
    email: string;
    password: string;
    roles: Role[];
}