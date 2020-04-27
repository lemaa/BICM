import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { UserRepository } from './../repositories/userRepository';

@injectable()
export class UserService {

	constructor( @inject(UserRepository) private userRepository: UserRepository ) {
		this.userRepository = getCustomRepository(UserRepository);
	}

}
