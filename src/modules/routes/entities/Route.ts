import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityBase } from "../../common/entities/BaseEntity";
import { Permission } from '../../permissions/entities/Permission';

@Entity({name: 'routes'})
export class Route implements EntityBase<number>{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true
    })
    pathname!: string;

    @Column()
    module!: string

    @Column({
        nullable: true,
        default: true
    })
    isActive!: boolean;

    @Column({
        nullable: true
    })
    description?: string;

    @ManyToMany(type => Permission, permission => permission.routes, {
        eager: true
    })
    @JoinTable({
        name: 'routes_permissions',
    })
    permissions!: Permission[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}