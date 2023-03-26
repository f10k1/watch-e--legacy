import UserController from '../controllers/user.controller';
import { usernameValidator, passwordValidator, emailValidator, confirmPasswordValidator } from './validators';
import passport from "./auth";
const userController = new UserController();

passport.initialize();

export default (router, upload, i18next) => {
    router.get("/user", upload.none(), userController.getUser);
    router.get("/user/login", upload.none(), userController.getLogin);
    router.post("/ajax/user/register", upload.none(), [usernameValidator(i18next), passwordValidator(i18next), emailValidator(i18next), confirmPasswordValidator(i18next)], userController.postRegister);
};