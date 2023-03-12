import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityBase } from "../../common/entities/BaseEntity";
import { Role } from '../../roles/entities/Role';
import { Route } from '../../routes/entities/Route';

@Entity({name: 'permissions'})
export class Permission implements EntityBase<number> {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    name!: string;

    @ManyToMany(type => Role, (role) => role.permissions)
    roles!: Role[]

    @ManyToMany(type => Route, route => route.permissions)
    routes!: Route[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}