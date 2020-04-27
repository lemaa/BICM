import { Client } from './../models/clientModel';
import { ClientRepository } from './../repositories/clientRepository';
import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';

@injectable()
export class ClientService {

	constructor( @inject(ClientRepository) private clientRepository: ClientRepository ) {

		this.clientRepository = getCustomRepository(ClientRepository);
	}

	public async findAll(): Promise<Client[]> {

        const clients = await this.clientRepository.find();

        return clients;
	}

    public async findOne(id: number): Promise<Client | undefined> {

        const client =	await this.clientRepository.findOne({ id });

		      return client;

	}

	public async create(client: Client): Promise<Client> {

		const newClient = await this.clientRepository.save(client);

		return newClient;
    }

    public async update(id: number, client: Client): Promise<Client> {

        client.id = id;

        const modifiedClient =  await this.clientRepository.save(client);

        return modifiedClient;

    }

    public async delete(id: number): Promise<any> {

		const deletedClient = await this.clientRepository.delete(id);

		return deletedClient ;
    }

}
