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

}
