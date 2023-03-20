import OAuth2Strategy from 'passport-oauth2';
import { SocialDTO } from './social.dto';

import passport = require('passport');

export class PassportAuth {
    authenticate = (config: Partial<SocialDTO>): any => {
        return passport.authenticate(config.name, {
            scope: config.scopes,
            failureFlash: config.failureFlash,
            successFlash: config.successFlash,
            session: config.session,
        });
    };

    // Callback after authentication request is executed.
    authenticateCallback = (config: Partial<SocialDTO>): any => {
        return passport.authenticate(config.name, {
            successRedirect: config.successRedirect,
            failureRedirect: config.failureRedirect,
        });
    };

    //connect passport config
    serializeUser() {
        passport.serializeUser(function (user: Express.User, done) {
            done(null, user);
        });
    }

    deserializeUser() {
        passport.deserializeUser(function (obj: unknown, done) {
            done(null, obj);
        });
    }

    connect(strategy: OAuth2Strategy) {
        passport.use(strategy);
    }
}
