import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        default: false,
    })
    isActivate: boolean;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: ''
    })
    tokenActivate: string;

    @Column({
        default: ''
    })
    tokenResetPass: string;


    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

}