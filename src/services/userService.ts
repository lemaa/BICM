import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { UserRepository } from './../repositories/userRepository';
import { User } from '../models/userModel';

@injectable()
export class UserService {

	constructor( @inject(UserRepository) private userRepository: UserRepository ) {
		this.userRepository = getCustomRepository(UserRepository);
    }

    public async findOne(id: number): Promise<User | undefined> {

        const user = await this.userRepository.findOne({ id });

		      return user;

	}

	public async create(user: User): Promise<User> {

		const newUser = await this.userRepository.save(user);

		return newUser;
    }

    public async update(id: number, user: User): Promise<User> {

        user.id = id;

        const modifiedUser =  await this.userRepository.save(user);

        return modifiedUser;

    }

    public async delete(id: number): Promise<any> {

		const deletedUser = await this.userRepository.delete(id);

		return deletedUser ;
    }
}
