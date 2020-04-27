import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete } from 'tsoa';
import { CompanyService } from '../services/companyService';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import { Company } from './../models/companyModel';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/compagnies')
export class CompanyController extends Controller {

    constructor(@inject(CompanyService) private companyService: CompanyService) {
        super();
    }

    @Get('/get/{id}')
    public async getCompany(id: number): Promise<IResponse> {
        /* todo: - input validation
        */
        try {
            const company = await this.companyService.findOne(id);

            if (company) {
                return {
                    status: 200,
                    data: {
                        company
                    }
                };
            }
            throw new ErrorHandler(404, 'No company found.');

        } catch (err) {
              return {
                    status: err.statusCode,
                    message: err.message,
                    data: null
            };
        }

    }

    @Post('/create')
    public async createCompany(@Body() body: Company): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            let newCompany = new Company();
            newCompany = body;

            const company = await this.companyService.create(newCompany);

            return {
                status: 200,
                data: {
                    company
                }
            };

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

    @Put('/update/{id}')
    public async updateCompany(@Path('id') id: number, @Body() body: Company): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const companyExists = await this.companyService.findOne(id);

            if (companyExists) {

                let modifiedCompany = new Company();
                modifiedCompany = body;
                const company = await  this.companyService.update(id, modifiedCompany);

                return {
                    status: 200,
                    data: {
                        company
                    }
                };
            }

            throw new ErrorHandler(404, 'No company found for update.');

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

    @Delete('/delete/{id}')
    public async deleteCompany(@Path('id') id: number): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const companyExists = await this.companyService.findOne(id);
            if (companyExists) {

                const deletedCompany = await this.companyService.delete(id);

                if (deletedCompany.affected === 1) {
                    return {
                        status: 200,
                        data: {}
                    };
                }
                throw new ErrorHandler(500, 'Unexpected error');
            }

            throw new ErrorHandler(404, 'no company found to delete' );

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

}
