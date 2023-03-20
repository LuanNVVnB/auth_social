export interface SocialDTO {
    name: string;
    failureFlash: string;
    successFlash: string;
    scopes: Array<string>;
    session: boolean;
    failureRedirect: string;
    successRedirect: string;
}

export interface SocialResponseDTO extends Express.User {
    id: string;
    socialName: string;
    name: string;
    photo: string;
    accessToken: string;
}

export interface Auth0StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    passReqToCallback: boolean;
}
