import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete, ValidationService, Tags, Security } from 'tsoa';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import { Vehicule } from './../models/vehiculeModel';
import { VehiculeService } from './../services/vehiculeService';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/vehicules')
@Tags('Vehicule')
export class VehiculeController extends Controller {

    constructor(@inject(VehiculeService) private vehiculeService: VehiculeService) {
        super();
    }

    @Security('Bearer')
    @Get('/get/{id}')
    public async getVehicule(id: number): Promise<IResponse> {
        /* todo: - input validation
        */
        try {
            const vehicule = await this.vehiculeService.findOne(id);

            if (vehicule) {
                return {
                    status: 200,
                    data: {
                        vehicule
                    }
                };
            }
            throw new ErrorHandler(404, 'No vehicule found.');

        } catch (err) {
              return {
                    status: err.statusCode,
                    message: err.message,
                    data: null
            };
        }

    }

    @Security('Bearer')
    @Post('/create')
    public async createVehicule(@Body() body: Vehicule): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            let newVehicule = new Vehicule();
            newVehicule = body;

            const vehicule = await this.vehiculeService.create(newVehicule);

            return {
                status: 200,
                data: {
                    vehicule
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

    @Security('Bearer')
    @Put('/update/{id}')
    public async updateVehicule(@Path('id') id: number, @Body() body: Vehicule): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const vehiculeExists = await this.vehiculeService.findOne(id);

            if (vehiculeExists) {

                let modifiedVehicule = new Vehicule();
                modifiedVehicule = body;
                const vehicule = await  this.vehiculeService.update(id, modifiedVehicule);

                return {
                    status: 200,
                    data: {
                        vehicule
                    }
                };
            }

            throw new ErrorHandler(404, 'No vehicule found for update.');

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

    @Security('Bearer')
    @Delete('/delete/{id}')
    public async deleteVehicule(@Path('id') id: number): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const vehiculeExists = await this.vehiculeService.findOne(id);
            if (vehiculeExists) {

                const deletedVehicule = await this.vehiculeService.delete(id);

                if (deletedVehicule.affected === 1) {
                    return {
                        status: 200,
                        data: {}
                    };
                }
                throw new ErrorHandler(500, 'Unexpected error');
            }

            throw new ErrorHandler(404, 'no vehicule found to delete' );

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }
}
