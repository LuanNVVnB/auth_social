import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/api/v1/user/login');
}

const UserRouting = express.Router();

const userController = new UserController();

UserRouting.post(`/login`, userController.login);
UserRouting.get('/user-info/:isSocial', userController.getProfile);
UserRouting.put(`/`, userController.updateUser);
UserRouting.get(`/login`, userController.loginPage);
UserRouting.get(`/home`, ensureAuthenticated, userController.homePage);
UserRouting.get(`/signup`, userController.signupPage);

export { UserRouting };
