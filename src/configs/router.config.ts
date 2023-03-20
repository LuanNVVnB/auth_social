import express from 'express';
import { SocialRouting } from '../modules/auth_social/social.router';
import { UserRouting } from '../modules/user/user.router';

const server = express();

interface RouterItem {
    User: string;
    Social: string;
}
enum RouterConstant {
    V1 = '/api/v1',
}

const routerCustom: RouterItem = {
    User: `${RouterConstant.V1}/user`,
    Social: `${RouterConstant.V1}/auth`,
};

export const configRouter = (app: typeof server) => {
    app.use(routerCustom.User, UserRouting);
    app.use(routerCustom.Social, SocialRouting);
};
