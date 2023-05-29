import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Timestamp, CreateDateColumn } from 'typeorm';
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

    @Column({ default: false })
    important: boolean;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
}