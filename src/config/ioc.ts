import { Container, injectable, decorate } from 'inversify';
import {Repository } from 'typeorm';

import { ClientRepository } from './../repositories';
import { ClientService } from './../services';
import { ClientController } from '../controllers';
import { Controller } from 'tsoa';

decorate(injectable(), Controller);
decorate(injectable(), Repository);

const iocContainer = new Container();
iocContainer.bind<ClientRepository>(ClientRepository).to(ClientRepository);
iocContainer.bind<ClientService>(ClientService).to(ClientService);
iocContainer.bind<ClientController>(ClientController).to(ClientController);

export { iocContainer };
