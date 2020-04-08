import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from './userModel';
import { Client } from './clientModel';

@Entity('company')
export class Company {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true, nullable: false })
    name: string;

    @Column('varchar', { unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column('integer', { unique: true, nullable: false })
    phone: number;

    @Column('varchar')
    address: string;

    @Column('varchar')
    city: string;

    @Column('integer')
    zip_code: number;

    @Column('varchar')
    country: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(type => User, user => user.company)
    users: User[];

    @ManyToMany(type => Client, client => client.compagnies)
    clients: Client[];
}
