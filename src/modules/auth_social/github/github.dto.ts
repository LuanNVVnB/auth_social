import dotenv from 'dotenv';
import { SocialDTO } from '../social.dto';

dotenv.config();

const {
    NAME_GITHUB,
    FAILURE_FLASH,
    SUCCESS_FLASH,
    SCOPES_PROFILE,
    SCOPES_EMAIL,
    FAILURE_REDIRECT,
    SUCCESS_REDIRECT,
} = process.env;

export class GithubItem implements SocialDTO {
    name = NAME_GITHUB;
    failureFlash = FAILURE_FLASH;
    successFlash = SUCCESS_FLASH;
    scopes = [SCOPES_PROFILE, SCOPES_EMAIL];
    session = false;
    failureRedirect = FAILURE_REDIRECT;
    successRedirect = SUCCESS_REDIRECT;
}
