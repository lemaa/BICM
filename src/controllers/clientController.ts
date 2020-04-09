import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete } from 'tsoa';
import { ClientService } from '../services/clientService';
import { injectable, inject } from 'inversify';
import { Client } from './../models/clientModel';
import ErrorHandler from '../utils/errorHandler';

export interface IResponse {
    message?: string;
    status: string;
    data: any;
}

@injectable()
@Route('/v1/clients')
export class ClientController extends Controller {

    constructor(@inject(ClientService) private clientService: ClientService) {
        super();
    }

    @Get('/get-all')
    public async getClients(): Promise<IResponse> {
        try {
            const clients = await this.clientService.findAll();

            return {
                status: 'success',
                data: {
                    length: clients.length,
                    clients
                }
            };

        } catch (err) {
            throw new ErrorHandler(500, 'An unexpected error occurred.');
        }

    }

    @Get('/get/{id}')
    public async getClient(id: number): Promise<Client> {
        /* todo: - input validation
                 - catch errors proprely
                 - return response as {code, message, data}
        */
        try {
            const client = await this.clientService.findOne(id);
            if (client) {
                return client;
            }
        } catch (err) {
            console.error(err);
        }

    }

    @Post('/create')
    public async createClient(@Body() body: Client): Promise<Client> {
        /* todo: - input validation
                 - catch errors proprely
                 - return response as {code, message, data}
        */
        try {
            let client = new Client();
            client = body;

            return this.clientService.create(client);

        } catch (err) {
            console.error(err);
        }

    }

    @Put('/update/{id}')
    public async updateClient(@Path('id') id: number, @Body() body: Client): Promise<Client> {
        /* todo: - input validation
                 - catch errors proprely
                 - return response as {code, message, data}
        */
        try {
            let client = new Client();
            client = body;

            return this.clientService.update(id, client);

        } catch (err) {
            console.error(err);
        }

    }

    @Delete('/delete/{id}')
    public async deleteClient(@Path('id') id: number): Promise<void> {
        /* todo: - input validation
                 - catch errors proprely
                 - return response as {code, message, data}
        */
        try {

            return this.clientService.delete(id);

        } catch (err) {
            console.error(err);
        }

    }
}