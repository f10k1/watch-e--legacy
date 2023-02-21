userController = require("../controllers/userController");

exports.appRoute = router => {
    router.get("/user", userController.getUserController);
};