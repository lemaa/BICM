import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { IsJSON} from 'class-validator';
import { Client } from './clientModel';

@Entity('vehicules')
export class Vehicule {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('varchar', {nullable: true})
    marque: string;

    @Column('varchar', {nullable: true})
    model: string;

    @Column('varchar', {nullable: true})
    color: string;

    @Column('varchar', {nullable: true})
    @IsJSON()
    pictures?: string;

    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @ManyToOne(type => Client, client => client.vehicules)
    client: Client;
}
