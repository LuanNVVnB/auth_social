import { Request } from 'express';
import GoogleStrategy, { Profile, VerifyCallback } from 'passport-google-oauth20';
import { AppDataSource } from '../../../configs/database.config';
import { User } from '../../user/user.entity';
import { UserDetail } from '../../user/userDetail.entity';
import { PassportAuth } from '../social.config';
import { SocialResponseDTO } from '../social.dto';
import { Social } from '../social.entity';

const googleStrategy = GoogleStrategy.Strategy;

const callBackOauth = async (userData: SocialResponseDTO): Promise<void> => {
    const socialRepo = AppDataSource.getRepository(Social);

    const socialFind = await socialRepo.findOne({
        where: { idSocial: userData.id },
    });

    if (!socialFind) {
        await AppDataSource.manager.transaction(
            'SERIALIZABLE',
            async transactionalEntityManager => {
                const socialNew = await transactionalEntityManager
                    .getRepository(Social)
                    .save({ socialName: userData.socialName, idSocial: userData.id });

                const user = await transactionalEntityManager.getRepository(User).save({
                    userName: userData.name,
                    email: userData.socialName,
                    password: process.env.PASSWORD_ACCOUNT,
                });

                await transactionalEntityManager
                    .createQueryBuilder()
                    .relation(Social, 'User')
                    .of(socialNew)
                    .set(user);

                const userDetail = await transactionalEntityManager.getRepository(UserDetail).save({
                    firstName: userData.name.slice(0, userData.name.indexOf(' ')),
                    lastName: userData.name.slice(userData.name.indexOf(' '), userData.name.length),
                    photo: userData.photo,
                });

                await transactionalEntityManager
                    .createQueryBuilder()
                    .relation(User, 'userDetail')
                    .of(user)
                    .set(userDetail);
            }
        );
    }
};

export class Google extends PassportAuth {
    constructor() {
        super();
        this.deserializeUser();
        this.serializeUser();
        this.connect(
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
        );
    }
}
