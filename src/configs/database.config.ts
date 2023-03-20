import path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { LoggerError, LoggerInfo } from '../utils/logger/winston.logger';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, PORT_DATA_BASE, USERNAME_DATA_BASE, PASSWORD_DATA_BASE, DATABASE_DATA_BASE } =
    process.env;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: HOST,
    port: Number(PORT_DATA_BASE),
    username: USERNAME_DATA_BASE,
    password: PASSWORD_DATA_BASE,
    database: DATABASE_DATA_BASE,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname + '/../modules/**/*.entity.ts')],
    migrations: [path.join(__dirname + '/../migrations/*.ts')],
    subscribers: [],
});

export const connectDatabase = () => {
    // console.log(path.join(__dirname + '/../modules/**/*.entity.ts'));
    AppDataSource.initialize()
        .then(async () => {
            LoggerInfo(' connect database successfully ');
        })
        .catch(error => {
            LoggerError(error);
        });
};
