import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../../configs/database.config';
import { Social } from './../auth_social/social.entity';
import { UserDetail } from './userDetail.entity';

export class UserService {
    private readonly userDetailRepo: Repository<UserDetail>;
    private readonly userRepo: Repository<User>;
    private readonly socialRepo: Repository<Social>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.socialRepo = AppDataSource.getRepository(Social);
        this.userDetailRepo = AppDataSource.getRepository(UserDetail);
    }

    async getInfoUser(idSocial: string): Promise<User> {
        const res = await this.userRepo.findOne({
            relations: { socials: true },
            where: {
                socials: {
                    idSocial: idSocial,
                },
            },
        });
        return res;
    }

    async getUser(email: string, password: string): Promise<User> {
        const res = await this.userRepo.findOne({
            where: { password: password, email: email },
            relations: { userDetail: true },
        });

        return res;
    }

    async updateUser(email: string, password: string): Promise<boolean | UpdateResult> {
        const userUpdate = await this.userRepo.findOne({
            where: {},
        });

        if (!userUpdate) return false;

        return await this.userRepo
            .createQueryBuilder()
            .update(UserDetail)
            .set({})
            .where('id = :id ', {
                id: userUpdate.id,
            })
            .returning('*')
            .execute();
    }
}
