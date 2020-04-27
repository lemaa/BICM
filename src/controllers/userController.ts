import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete } from 'tsoa';
import { UserService } from '../services/userService';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import { User } from './../models/userModel';
import { IResponse } from './responses/responseInterface';

@injectable()
@Route('/v1/users')
export class UserController extends Controller {

    constructor(@inject(UserService) private userService: UserService) {
        super();
    }

}
