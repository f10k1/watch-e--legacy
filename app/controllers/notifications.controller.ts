import NotificationModel from '../models/notification.model';

export default class NotificationsController {
    notificationModel = new NotificationModel();

    getNotifications = async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        if (req.headers['x-csrf-token'] != req.session.csrf) {
            res.sendStatus(403);
            return;
        }
        const notifications = await this.notificationModel.getNotifications(req.user.id);
        return res.end(JSON.stringify(notifications));
    };

    deleteNotification = async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        if (req.body === undefined || req.body.id === undefined) {
            res.sendStatus(400)
            return;
        }

        if (req.body.csrf != req.session.csrf) {
            res.sendStatus(403);
            return;
        }

        const notification = this.notificationModel.getNotification(req.user.id, req.body.id);

        if (!notification) {
            res.sendStatus(403);
            return;
        }

        await this.notificationModel.removeNotification(Number(req.body.id));
        return res.end(JSON.stringify({'id': req.body.id}))
    };

    patchNotification = async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        if (!req.user) {
            res.sendStatus(401);
            return;
        }

        if (req.body === undefined || req.body.id === undefined) {
            res.sendStatus(400)
            return;
        }

        if (req.body.csrf != req.session.csrf) {
            res.sendStatus(403);
            return;
        }

        const notification = this.notificationModel.getNotification(req.user.id, req.body.id);

        if (!notification) {
            res.sendStatus(403);
            return;
        }

        const data = {};

        if (req.body.title) data['title'] = req.body.title;
        if (req.body.description) data['description'] = req.body.description;
        if (req.body.watched) data['watched'] = Boolean(req.body.watched);
        if (req.body.type) data['type'] = req.body.type;

        const updatedNotification = await this.notificationModel.changeNotification(Number(req.body.id), data);
        res.end(JSON.stringify(updatedNotification));
    };
}