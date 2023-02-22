"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userController = new user_controller_1.default();
exports.default = (router, upload) => {
    router.get("/user", upload.none(), userController.getUser);
    router.put("/user", upload.none(), userController.createUser);
};
//# sourceMappingURL=index.js.map