import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.entity';

@Entity()
export default class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    watched: boolean;

    @Column()
    type: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
}