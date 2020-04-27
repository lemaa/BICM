import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { VehiculeRepository } from './../repositories/vehiculeRepository';

@injectable()
export class VehiculeService {

	constructor( @inject(VehiculeRepository) private vehiculeRepository: VehiculeRepository ) {
		this.vehiculeRepository = getCustomRepository(VehiculeRepository);
	}

}