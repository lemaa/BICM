import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete, ValidationService } from 'tsoa';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import { Vehicule } from './../models/vehiculeModel';
import { VehiculeService } from './../services/vehiculeService';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/vehicules')
export class VehiculeController extends Controller {

    constructor(@inject(VehiculeService) private vehiculeService: VehiculeService) {
        super();
    }

}
