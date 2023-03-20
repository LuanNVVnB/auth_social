import { Request, Response } from 'express';
import { ResponseCustom } from '../../utils/errors/responseError';
import { UserService } from './user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    loginPage(req: Request, res: Response): void {
        return res.render('login');
    }
    signupPage(req: Request, res: Response): void {
        return res.render('signup');
    }

    homePage = async (req: Request, res: Response): Promise<void | Response> => {
        return res.render('home', {
            user: req.user,
        });
    };

    getProfile = async (req: Request, res: Response): Promise<void> => {
        const { isSocial } = req.params;
        const userInfo = await this.userService.getInfoUser(isSocial);
        console.log(userInfo);
        return userInfo ? res.render('profile', { user: userInfo }) : res.render('error');
    };

    login = async (req: Request, res: Response): Promise<void | Response> => {
        const { email, password } = req.body;
        // eslint-disable-next-line no-async-promise-executor
        console.log(email, password);
        try {
            const data = await this.userService.getUser(email, password);

            if (data) {
                return res.render('home', {
                    user: {
                        email: email,
                        name: 'Account',
                        photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Google_Zircon.svg',
                    },
                });
            }

            return res.render('error');
        } catch (err) {
            console.log(err);
        }
    };

    updateUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const data = await this.userService.updateUser(email, password);
            console.log(data);
            if (data)
                return res.render('home', {
                    user: data,
                });

            return res.render('error');
        } catch (err) {
            console.log(err);
            return res.status(400).json(new ResponseCustom('error', 'server error').get());
        }
    };
}
