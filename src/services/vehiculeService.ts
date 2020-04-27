import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { VehiculeRepository } from './../repositories/vehiculeRepository';
import { Vehicule } from '../models/vehiculeModel';

@injectable()
export class VehiculeService {

	constructor( @inject(VehiculeRepository) private vehiculeRepository: VehiculeRepository ) {
		this.vehiculeRepository = getCustomRepository(VehiculeRepository);
    }
    public async findOne(id: number): Promise<Vehicule | undefined> {

        const vehicule =	await this.vehiculeRepository.findOne({ id });

		      return vehicule;

	}

	public async create(vehicule: Vehicule): Promise<Vehicule> {

		const newVehicule = await this.vehiculeRepository.save(vehicule);

		return newVehicule;
    }

    public async update(id: number, vehicule: Vehicule): Promise<Vehicule> {

        vehicule.id = id;

        const modifiedVehicule =  await this.vehiculeRepository.save(vehicule);

        return modifiedVehicule;

    }

    public async delete(id: number): Promise<any> {

		const deletedVehicule = await this.vehiculeRepository.delete(id);

		return deletedVehicule ;
    }

}
