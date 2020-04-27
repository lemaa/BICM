import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { CompanyRepository } from './../repositories/companyRepository';

@injectable()
export class CompanyService {

	constructor( @inject(CompanyRepository) private companyRepository: CompanyRepository ) {
		this.companyRepository = getCustomRepository(CompanyRepository);
	}

}
