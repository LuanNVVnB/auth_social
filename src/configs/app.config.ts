import { sessionConfig } from './session.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import passport from 'passport';
import { connectDatabase } from './database.config';
import { configRouter } from './router.config';
import { configViewEngine } from './view.config';

const app = express();
export const App = async (): Promise<Express> => {
    //config app
    app.use(cors());
    app.use(express.json());

    sessionConfig(app);

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    configViewEngine(app);
    configRouter(app);

    //database connect
    connectDatabase();
    return app;
};
