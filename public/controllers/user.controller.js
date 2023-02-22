"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default;
class UserController {
    constructor() {
        this.getUser = (req, res, next) => {
            userModel.getUser().then(data => {
                res.render('../views/pages/user', { users: data });
            });
        };
        this.createUser = (req, res, next) => {
            if (!req.body.login || !req.body.password || !req.body.email)
                return res.render('../views/pages/user', { errorBag: 'Wrong data' });
            userModel.createUser(req.body).then(data => {
                console.log(data);
                res.render('../views/pages/user', { data: data });
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map