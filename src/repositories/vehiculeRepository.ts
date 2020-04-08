import { EntityRepository, Repository } from 'typeorm';
import { Vehicule } from '../models/vehiculeModel';

@EntityRepository(Vehicule)
export class VehiculeRepository extends Repository<Vehicule>  {

}
