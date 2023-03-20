# Awesome Project Build with TypeORM

Steps to run this project:

# node v18, step setup

1. yarn
   2.yarn start

#login with google config

```
 new googleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: process.env.URL_CALL_BACK_GOOGLE,
                    passReqToCallback: true,
                },
                async function (
                    req: Request,
                    accessToken: string,
                    refreshToken: string,
                    profile: Profile,
                    done: VerifyCallback
                ): Promise<void> {
                    try {
                        const userData: SocialResponseDTO = {
                            id: profile.id,
                            socialName: profile.emails[0].value,
                            name: profile.displayName,
                            photo: profile._json.picture,
                            accessToken,
                        };

                        callBackOauth(userData);

                        return done(null, userData);
                    } catch (err) {

                        return done(null, false);
                    }
                }
            )
```

# config auth with passport

```
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
```

# using login with google

```
const googleItem = new GoogleItem();
const google = new Google();

const SocialRouting = express.Router();

SocialRouting.get(
    `/google`,
    google.authenticate({
        name: googleItem.name,
        scopes: googleItem.scopes,
        session: googleItem.session,
    })
);
SocialRouting.get(
    `/google/callback`,
    google.authenticateCallback({
        name: googleItem.name,
        successRedirect: googleItem.successRedirect,
        failureRedirect: googleItem.failureRedirect,
    })
);
```
