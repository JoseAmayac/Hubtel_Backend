import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityBase } from '../../common/entities/BaseEntity';
import { Permission } from '../../permissions/entities/Permission';
import { User } from '../../users/entities/User';

@Entity({name: 'roles'})
export class Role implements EntityBase<number> {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true
    })
    name!: string;

    @ManyToMany(type => Permission)
    @JoinTable({
        name: 'roles_permissions'
    })
    permissions!: Permission[];

    @ManyToMany(type => User, user => user.roles)
    users!: User[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    
}