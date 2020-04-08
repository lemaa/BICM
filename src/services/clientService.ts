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

        return this.clientRepository.find();
	}

    public async findOne(id: number): Promise<Client | undefined> {

        const client =	this.clientRepository.findOne({ id });

		      return client;

	}

	public async create(client: Client): Promise<Client> {

		const newClient = await this.clientRepository.save(client);

		return newClient;
    }

    public async update(id: number, client: Client): Promise<Client> {

		client.id = id;

		return this.clientRepository.save(client);
    }

    public async delete(id: number): Promise<void> {

		await this.clientRepository.delete(id);

		return;
    }

}
