import UserController from '../controllers/user.controller';
import { usernameValidator, passwordValidator, emailValidator, confirmPasswordValidator } from './validators';
import passport from "./auth";
import DashboardController from '../controllers/dashboard.controller';
import ChartController from '../controllers/chart.controller';
import NotificationsController from '../controllers/notifications.controller';

const userController = new UserController();
const dashboardController = new DashboardController();
const chartController = new ChartController();
const notificationsController = new NotificationsController();

passport.initialize();

export default (router, upload, i18next) => {
    router.get("/user", upload.none(), userController.getUser);
    router.get("/user/login", upload.none(), userController.getLogin);
    router.get("/user/logout", upload.none(), userController.getLogout);
    router.get("/dashboard", upload.none(), dashboardController.getDashboard);
    router.get("/dashboard/*", upload.none(), dashboardController.getDashboard);

    router.get("/ajax/notifications", upload.none(), notificationsController.getNotifications);
    router.patch("/ajax/notification", upload.none(), notificationsController.patchNotification);
    router.delete("/ajax/notification", upload.none(), notificationsController.deleteNotification);

    router.post("/ajax/user/register", upload.none(), [usernameValidator(i18next), passwordValidator(i18next), emailValidator(i18next), confirmPasswordValidator(i18next)], userController.postRegister);
    router.post("/ajax/user/login", upload.none(), userController.postLogin);

    router.get("/ajax/chart/notification/hour", upload.none(), chartController.getNotificationByHour);
};