import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete, Tags, Security } from 'tsoa';
import { ClientService } from '../services/clientService';
import { injectable, inject } from 'inversify';
import { Client } from './../models/clientModel';
import ErrorHandler from '../utils/errorHandler';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/clients')
@Tags('Client')
export class ClientController extends Controller {

    constructor(@inject(ClientService) private clientService: ClientService) {
        super();
    }

    @Security('Bearer')
    @Get('/get-all')
    public async getClients(): Promise<IResponse> {
        try {
            const clients = await this.clientService.findAll();
            if (clients) {
                return {
                    status: 200,
                    data: {
                        length: clients.length,
                        clients
                    }
                };
            }

            throw new ErrorHandler(404, 'No clients found.');

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
        };
        }

    }

    @Security('Bearer')
    @Get('/get/{id}')
    public async getClient(id: number): Promise<IResponse> {
        /* todo: - input validation
        */
        try {
            const client = await this.clientService.findOne(id);

            if (client) {
                return {
                    status: 200,
                    data: {
                        client
                    }
                };
            }
            throw new ErrorHandler(404, 'No client found.');

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
    public async createClient(@Body() body: Client): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            let newClient = new Client();
            newClient = body;

            const client = await this.clientService.create(newClient);

            return {
                status: 200,
                data: {
                    client
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
    public async updateClient(@Path('id') id: number, @Body() body: Client): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const clientExists = await this.clientService.findOne(id);

            if (clientExists) {

                let modifiedClient = new Client();
                modifiedClient = body;
                const client = await  this.clientService.update(id, modifiedClient);

                return {
                    status: 200,
                    data: {
                        client
                    }
                };
            }

            throw new ErrorHandler(404, 'No client found for update.');

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
    public async deleteClient(@Path('id') id: number): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const clientExists = await this.clientService.findOne(id);
            if (clientExists) {

                const deletedClient = await this.clientService.delete(id);

                if (deletedClient.affected === 1) {
                    return {
                        status: 200,
                        data: {}
                    };
                }
                throw new ErrorHandler(500, 'Unexpected error');
            }

            throw new ErrorHandler(404, 'no client found to delete' );

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }
}
