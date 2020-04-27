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

    @Get('/get/{id}')
    public async getUser(id: number): Promise<IResponse> {
        /* todo: - input validation
        */
        try {
            const user = await this.userService.findOne(id);

            if (user) {
                return {
                    status: 200,
                    data: {
                        user
                    }
                };
            }
            throw new ErrorHandler(404, 'No user found.');

        } catch (err) {
              return {
                    status: err.statusCode,
                    message: err.message,
                    data: null
            };
        }

    }

    @Post('/create')
    public async createUser(@Body() body: User): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            let newUser = new User();
            newUser = body;

            const user = await this.userService.create(newUser);

            return {
                status: 200,
                data: {
                    user
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
    public async updateUser(@Path('id') id: number, @Body() body: User): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const userExists = await this.userService.findOne(id);

            if (userExists) {

                let modifiedUser = new User();
                modifiedUser = body;
                const user = await  this.userService.update(id, modifiedUser);

                return {
                    status: 200,
                    data: {
                        user
                    }
                };
            }

            throw new ErrorHandler(404, 'No user found for update.');

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }

    @Delete('/delete/{id}')
    public async deleteUser(@Path('id') id: number): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {

            const userExists = await this.userService.findOne(id);
            if (userExists) {

                const deletedUser = await this.userService.delete(id);

                if (deletedUser.affected === 1) {
                    return {
                        status: 200,
                        data: {}
                    };
                }
                throw new ErrorHandler(500, 'Unexpected error');
            }

            throw new ErrorHandler(404, 'no user found to delete' );

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: null
            };
        }

    }
}
