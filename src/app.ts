 import express from 'express';
 import cors from 'cors';
 import path from 'path';
 import bodyParser from 'body-parser';
 import swaggerUi from 'swagger-ui-express';
 import {RegisterRoutes} from './routes/routes';
 import './controllers/clientController';

 class App {

    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
        this.swagger();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, '../public')));
        RegisterRoutes(this.app);
    }

    private swagger(): void {
        try {
            const swaggerDocument = require('../swagger.json');
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        } catch (err) {
            console.log('Unable to load swagger.json', err);
        }
    }
}

 export default new App().app;
