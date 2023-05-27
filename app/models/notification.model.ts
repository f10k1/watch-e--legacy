import { error } from "console";
import AppDataSource from "../../dataSource";
import Notification from "../database/notification.entity";
import UserModel from "./user.model";
export default class NotificationModel {
    userModel = new UserModel();
    repository = AppDataSource.getRepository(Notification);

    async getNotifications(userId) {
        return new Promise(async (resolve) => {
            const notifications = await this.repository.find({
                relations: {
                    user: true
                },
                where: {
                    user: { id: userId }
                }
            });
            resolve(notifications);
        });
    }

    async getNotification(userId, notificationId) {
        return new Promise(async (resolve) => {
            const notification = await this.repository.findOneBy({
                user: { id: userId },
                id: notificationId
            });
            resolve(notification);
        });
    }

    async changeNotification(id: number, data) {
        try {
            await this.repository.update({ id: id }, { ...data });
            return await this.repository.findOneBy({ id });
        }
        catch (e) {
            console.error(e);
        }
    }

    async removeNotification(id) {
        try {
            return await this.repository.delete(id);
        }
        catch (e) {
            console.error(e);
        }

    }

    async createNotification(data, username) {
        const notification = new Notification();

        const user = await this.userModel.getUser(username);
        notification.description = data.description;
        notification.title = data.description;
        notification.type = data.type;
        notification.user = user;

        return await this.repository.insert(notification);
    }
}