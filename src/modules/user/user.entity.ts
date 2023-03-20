import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Social } from '../auth_social/social.entity';
import { UserDetail } from './userDetail.entity';

interface UserInterface {
    id: string;

    userName: string;

    password: string;

    email: string;
}

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({ default: false })
    active: boolean;

    @Column()
    email: string;

    @OneToOne(() => UserDetail)
    @JoinColumn()
    userDetail: UserDetail;

    @OneToMany(() => Social, social => social.user)
    socials: Social[];
}
