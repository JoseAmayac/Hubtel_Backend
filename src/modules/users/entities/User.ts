import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { EntityBase } from "../../common/entities/BaseEntity";
import { Role } from "../../roles/entities/Role";

@Entity({name: 'users'})
export class User implements EntityBase<number> {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @ManyToMany(type => Role, role => role.users, {
        eager: true
    })
    @JoinTable({
        name: 'users_roles',
    })
    roles!: Role[];

    @Column({
        nullable: true,
        default: false
    })
    isVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}