import { EntityRepository, Repository } from 'typeorm';
import { Settings } from '../models/settingsModel';

@EntityRepository(Settings)
export class SettingsRepository extends Repository<Settings>  {

}
