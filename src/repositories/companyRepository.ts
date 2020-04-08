import { EntityRepository, Repository } from 'typeorm';
import { Company } from '../models/companyModel';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>  {

}
