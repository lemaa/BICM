import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { CompanyRepository } from './../repositories/companyRepository';
import { Company } from '../models/companyModel';

@injectable()
export class CompanyService {

	constructor( @inject(CompanyRepository) private companyRepository: CompanyRepository ) {
		this.companyRepository = getCustomRepository(CompanyRepository);
    }

    public async findOne(id: number): Promise<Company | undefined> {

        const company =	await this.companyRepository.findOne({ id });

		      return company;

	}

	public async create(company: Company): Promise<Company> {

		const newCompany = await this.companyRepository.save(company);

		return newCompany;
    }

    public async update(id: number, company: Company): Promise<Company> {

        company.id = id;

        const modifiedCompany =  await this.companyRepository.save(company);

        return modifiedCompany;

    }

    public async delete(id: number): Promise<any> {

		const deletedCompany = await this.companyRepository.delete(id);

		return deletedCompany ;
    }
}
