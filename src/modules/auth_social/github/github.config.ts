import { Request } from 'express';
import GitHubStrategy from 'passport-github2';
import { AppDataSource } from '../../../configs/database.config';
import { PassportAuth } from '../social.config';
import { SocialResponseDTO } from '../social.dto';
import { Social } from '../social.entity';

const githubStrategy = GitHubStrategy.Strategy;

const callBackOauth = async (userData: SocialResponseDTO): Promise<void> => {
    const socialRepo = AppDataSource.getRepository(Social);

    const socialFind = await socialRepo.findOne({
        where: { idSocial: userData.id },
    });

    socialFind
        ? socialFind
        : await socialRepo.save({ idSocial: userData.id, socialName: userData.socialName });
};

export class Github extends PassportAuth {
    constructor() {
        super();
        this.deserializeUser();
        this.serializeUser();
        this.connect(
            new githubStrategy(
                {
                    clientID: process.env.GITHUB_CLIENT_ID,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    callbackURL: process.env.URL_CALL_BACK_GITHUB,
                    passReqToCallback: true,
                },
                async function (
                    request: Request,
                    accessToken: string,
                    refreshToken: string,
                    profile: GitHubStrategy.Profile,
                    done: (error: any, user?: any) => void
                ): Promise<void> {
                    try {
                        const userData: SocialResponseDTO = {
                            id: profile.id,
                            socialName: profile.profileUrl,
                            name: profile.username,
                            photo: profile.photos[0].value,
                            accessToken,
                        };

                        callBackOauth(userData);

                        return done(null, userData);
                    } catch (err) {
                        console.log(err);
                        return done(null, false);
                    }
                }
            )
        );
    }
}
