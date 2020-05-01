import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import { User } from './userModel';

@Entity('settings')
export class Settings {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('boolean', { default: true})
    notification: boolean;

    @Column('boolean', { default: true})
    theme: boolean;

    @Column('boolean', { default: true})
    sound: boolean;

    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}
