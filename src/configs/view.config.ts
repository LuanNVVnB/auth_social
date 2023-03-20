import express, { Express } from 'express';

export const configViewEngine = (app: Express) => {
    app.use(express.static('./src/public')); //orientation folder contains img css
    app.set('view engine', 'ejs'); //to make if else ,...
    app.set('views', './src/views/'); //write file ejs in views
};
