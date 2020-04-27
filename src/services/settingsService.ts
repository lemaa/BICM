import { SettingsRepository } from './../repositories/settingsRepository';
import { injectable, inject } from 'inversify';
import {getCustomRepository} from 'typeorm';
import { Settings } from './../models/settingsModel';
import { User } from './../models/userModel';

@injectable()
export class SettingsService {

	constructor( @inject(SettingsRepository) private settingsRepository: SettingsRepository ) {

		this.settingsRepository = getCustomRepository(SettingsRepository);
	}

    public async findOne(id: number): Promise<Settings | undefined> {

        const settings =	await this.settingsRepository.findOne({ id });

		      return settings;

	}

    public async update(id: number, settings: Settings): Promise<Settings> {

		settings.id = id;

		return this.settingsRepository.save(settings);
    }

}
