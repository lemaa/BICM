import { Container, injectable, decorate } from 'inversify';
import {Repository } from 'typeorm';
import { Controller } from 'tsoa';
import { ClientRepository, CompanyRepository, SettingsRepository, UserRepository, VehiculeRepository } from './../repositories';
import { ClientService, CompanyService , SettingsService, UserService, VehiculeService } from './../services';
import { ClientController, CompanyController, SettingsController, UserController, VehiculeController } from '../controllers';

decorate(injectable(), Controller);
decorate(injectable(), Repository);

const iocContainer = new Container();

iocContainer.bind<ClientRepository>(ClientRepository).to(ClientRepository);
iocContainer.bind<ClientService>(ClientService).to(ClientService);
iocContainer.bind<ClientController>(ClientController).to(ClientController);

iocContainer.bind<CompanyRepository>(CompanyRepository).to(CompanyRepository);
iocContainer.bind<CompanyService>(CompanyService).to(CompanyService);
iocContainer.bind<CompanyController>(CompanyController).to(CompanyController);

iocContainer.bind<SettingsRepository>(SettingsRepository).to(SettingsRepository);
iocContainer.bind<SettingsService>(SettingsService).to(SettingsService);
iocContainer.bind<SettingsController>(SettingsController).to(SettingsController);

iocContainer.bind<UserRepository>(UserRepository).to(UserRepository);
iocContainer.bind<UserService>(UserService).to(UserService);
iocContainer.bind<UserController>(UserController).to(UserController);

iocContainer.bind<VehiculeRepository>(VehiculeRepository).to(VehiculeRepository);
iocContainer.bind<VehiculeService>(VehiculeService).to(VehiculeService);
iocContainer.bind<VehiculeController>(VehiculeController).to(VehiculeController);

export { iocContainer };
