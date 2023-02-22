import UserController from '../controllers/user.controller';

const userController = new UserController();

export default (router, upload) => {
    router.get("/user", upload.none(), userController.getUser);
    router.put("/user", upload.none(), userController.createUser);
};