import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';



export default class UserController {

    userModel = new UserModel;
    style = 'user';

    postRegister = (req, res, next) => {
        const variables = {};
        variables['errors'] = validationResult(req);

        if (!variables['errors'].length) this.userModel.createUser(res.body).then(res => {});

        res.render('../views/pages/user/register.pug', { style: this.style, ...variables });
    };

    getUser = (req, res, next) => {
        const variables = {};
        if (1) res.render('../views/pages/user/login.pug', {style: this.style})
        return
        this.userModel.getUser().then(data => {
            res.render('../views/layouts/user.pug', { style: this.style, ...variables });
        });
    };
}
