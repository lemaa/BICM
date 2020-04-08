import { EntityRepository, Repository } from 'typeorm';
import { Client } from './../models/clientModel';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client>  {

}
