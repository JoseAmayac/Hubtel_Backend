
export interface FormUserDTO{
    name: string;
    email: string;
    roles: number[]
}

export interface CreationUserDTO{
    name: string;
    email: string;
    password: string;
    roles: UserRoleIds[]
}

export interface UserRoleIds{
    id: number;
}