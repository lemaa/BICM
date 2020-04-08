import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error('Couldn\'t find .env file');
}

export default {

  port: process.env.PORT,
  typeorm_port: process.env.TYPEORM_PORT,
  typeorm_username: process.env.TYPEORM_USERNAME,
  typeorm_password: process.env.TYPEORM_PASSWORD,
  typeorm_database: process.env.TYPEORM_DATABASE,
  typeorm_host: process.env.TYPEORM_HOST,
  typeorm_dialect: process.env.TYPEORM_CONNECTION,
  typeorm_synchronize: process.env.TYPEORM_SYNCHRONIZE,

  jwtSecret: process.env.JWT_SECRET,

  logs: {
    level: process.env.LOG_LEVEL || 'default'
  }
};
