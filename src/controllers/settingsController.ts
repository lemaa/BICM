import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete } from 'tsoa';
import { SettingsService } from '../services/settingsService';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import { Settings } from './../models/settingsModel';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/settings')
export class SettingsController extends Controller {

    constructor(@inject(SettingsService) private settingsService: SettingsService) {
        super();
    }
    @Get('/get/{id}')
    public async getSettings(id: number): Promise<IResponse> {
        /* todo: - input validation
        */
        try {
            const settings = await this.settingsService.findOne(id);

            if (settings) {
                return {
                    status: 200,
                    data: {
                        settings
                    }
                };
            }
            throw new ErrorHandler(404, 'No settings found.');

        } catch (err) {
              return {
                    status: err.statusCode,
                    message: err.message,
                    data: null
            };
        }

    }

    @Put('/update/{id}')
    public async updateSettings(@Path('id') id: number, @Body() body: Settings): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const settingsExists = await this.settingsService.findOne(id);

            if (settingsExists) {

                let modifiedSettings = new Settings();
                modifiedSettings = body;
                const settings = await  this.settingsService.update(id, modifiedSettings);

                return {
                    status: 200,
                    data: {
                        settings
                    }
                };
            }

            throw new ErrorHandler(404, 'No settings found for update.');

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

}
