import { Body, Controller, Get, Header, Path, Post, Query, Route, Put, SuccessResponse, Response, Delete, Tags } from 'tsoa';
import { UserService } from '../services/userService';
import { injectable, inject } from 'inversify';
import ErrorHandler from '../utils/errorHandler';
import PasswordHandler from '../utils/passwordHandler';
import { User } from '../models/userModel';
import { IResponse } from './responses/responseInterface';
import * as jwt from 'jsonwebtoken';
import config from '../config/env';

@injectable()
@Route('/v1/auth')
@Tags('Auth')
export class AuthController extends Controller {

    constructor(@inject(UserService) private userService: UserService) {
        super();
    }

    @Post('/signup')
    public async signup(@Body() body: User): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            let newUser = new User();
            newUser = body;

            const hashedPass = PasswordHandler.hashPassword(newUser.password);
            newUser.password = hashedPass;
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
                data: err
            };
        }

    }

    @Post('/signin')
    public async signin(@Body() body: {email: string, password: string}): Promise<IResponse> {
        /* todo: - input validation
                 - catch errors proprely
        */
        try {
            const email = body.email;
            const password = body.password;
            let user = new User();

            if (!email || !password) {
                throw new ErrorHandler(404, 'missing inputs.');
            }

            user = await this.userService.findByEmail(email);

            if (!user) {
                throw new ErrorHandler(404, 'No user found.');
            }

            if (!PasswordHandler.checkIfUnencryptedPasswordIsValid(password, user.password)) {
                throw new ErrorHandler(401, 'unauthorized.');
            }

            const token = await this.generateJwt(user);

            return {
                status: 200,
                data: {
                    user,
                    token
                }
            };

        } catch (err) {
            return {
                status: err.statusCode,
                message: err.message,
                data: err
            };
        }

    }

    private async generateJwt(user: User) {
        return jwt.sign({
                data: {
                    userId: user.id,
                    userEmail: user.email,
                    userRole: user.role
                }
            },
            config.jwtSecret, {
                expiresIn: '1h'
            });
    }

}
