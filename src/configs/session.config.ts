import express from 'express';
import session from 'express-session';
// import RedisStore from 'connect-redis';

const server = express();

export const sessionConfig = (app: typeof server) => {
    app.use(
        session({
            secret: 'keyboard cat',
            saveUninitialized: true,
            cookie: { secure: false, maxAge: 1000 * 60 * 5 },
            store: new session.MemoryStore(),
        })
    );
};
