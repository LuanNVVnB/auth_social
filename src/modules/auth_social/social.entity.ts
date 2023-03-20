import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

interface SocialInterface {
    id: string;

    socialName: string;
}

@Entity()
export class Social implements SocialInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    socialName: string;

    @Column()
    idSocial: string;

    @ManyToOne(() => User)
    @JoinTable()
    user: User;
}
