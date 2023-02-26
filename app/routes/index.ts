import UserController from '../controllers/user.controller';
import { usernameValidator, passwordValidator, emailValidator, confirmPasswordValidator } from './validators';
const userController = new UserController();

export default (router, upload, i18next) => {
    router.get("/user", upload.none(), userController.getUser);
    router.put("/user", upload.none(), userController.putUser);
    router.post("/user/register", upload.none(), [usernameValidator(i18next), passwordValidator(i18next), emailValidator(i18next), confirmPasswordValidator(i18next)], userController.postRegister);
    router.get("/user/login", upload.none(), userController.getLogin);
    router.get("/user/register", upload.none(), userController.getRegister);
};