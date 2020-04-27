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

}
