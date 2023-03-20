import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface UserInterface {
    id: string;

    firstName: string;

    lastName: string;
}

@Entity()
export class UserDetail implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    photo: string;
}
