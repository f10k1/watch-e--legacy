import UserController from '../controllers/user.controller';
import { usernameValidator, passwordValidator, emailValidator, confirmPasswordValidator } from './validators';
const userController = new UserController();

export default (router, upload, i18next) => {
    router.get("/user", upload.none(), userController.getUser);
    router.post("/ajax/user/register", upload.none(), [usernameValidator(i18next), passwordValidator(i18next), emailValidator(i18next), confirmPasswordValidator(i18next)], userController.postRegister);
};