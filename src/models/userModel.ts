import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { IsEmail, IsDate} from 'class-validator';
import { Company } from './companyModel';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {nullable: false })
    firstName: string;

    @Column('varchar', {nullable: false })
    lastName: string;

    @Column('varchar', { unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column('integer', { unique: true, nullable: false })
    phone: number;

    @Column('date')
    @IsDate()
    birthdate: Date;

    @Column('varchar')
    address: string;

    @Column('varchar')
    city: string;

    @Column('integer')
    zip_code: number;

    @Column('varchar')
    country: string;

    @Column('varchar')
    picture: string;

    @Column('varchar', { nullable: false })
    password: string;

    @Column('varchar', { nullable: false })
    salt: string;

    @Column('boolean', {default: false})
    isActive: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(type => Company, company => company.users)
    company: Company;

}
