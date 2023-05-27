import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Notification from './notification.entity';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ default: false })
    active: boolean;

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];
}