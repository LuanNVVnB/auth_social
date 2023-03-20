import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { App } from './src/configs/app.config';
dotenv.config();
import { Logger, LoggerInfo } from './src/utils/logger/winston.logger';
import { AppDataSource } from './src/configs/database.config';

const server = express();
const host = process.env.HOST;
const port = process.env.PORT || 3000;

// eslint-disable-next-line no-useless-catch
const createServer = async (app: typeof server): Promise<void> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const server = http.createServer(app);
        return new Promise(resolve => {
            app.listen(port, () => {
                // eslint-disable-next-line no-console
                console.log(`Example app listening at http://${host}:${port}/api/v1`);
                LoggerInfo('server run');
                resolve(this);
            });
            process.on('SIGINT', () => {
                Logger.info('Shutting down server...');
                server.close(() => {
                    AppDataSource.destroy();
                    Logger.info(' disconnect database ');
                    process.exit(0);
                });
            });
        });
    } catch (err) {
        throw err;
    }
};

(async () => {
    try {
        // ============= initialize web server
        const app = await App();
        await createServer(app);
        // Handle server shutdown events
    } catch (err) {
        Logger.error(err);
        process.exit();
    }
})();
