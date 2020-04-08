import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Vehicule } from './vehiculeModel';
import { Company } from './companyModel';

@Entity('clients')
export class Client {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', {nullable: false})
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('varchar', { unique: true })
    @IsEmail()
    email?: string;

    @Column('integer', { unique: true, nullable: false })
    phone: number;

    @Column('integer')
    age?: number;

    @Column('varchar')
    address: string;

    @Column('varchar')
    city: string;

    @Column('integer')
    zip_code: number;

    @Column('varchar')
    country: string;

    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @OneToMany(type => Vehicule, vehicule => vehicule.client)
    vehicules?: Vehicule[];

    @ManyToMany(type => Company, company => company.clients)
    @JoinTable()
    compagnies?: Company[];
}
