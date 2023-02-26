import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';



export default class UserController {

    userModel = new UserModel;
    style = 'user';

    getLogin = (req, res, next) => {
        res.render('../views/pages/user/login.pug', { style: this.style });
    };

    getRegister = (req, res, next) => {
        res.render('../views/pages/user/register.pug', { style: this.style });
    };

    postRegister = (req, res, next) => {
        const variables = {};
        variables['errors'] = validationResult(req);

        if (!variables['errors'].length) this.userModel.createUser(res.body).then(res => {});

        res.render('../views/pages/user/register.pug', { style: this.style, ...variables });
    };

    getUser = (req, res, next) => {
        const variables = {};
        this.userModel.getUser().then(data => {
            res.render('../views/layouts/user', { style: this.style, ...variables });
        });
    };

    putUser = (req, res, next) => {
        const variables = {};
        if (!req.body.login || !req.body.password || !req.body.email) return res.render('../views/layouts/user', { errorBag: 'Wrong data' });
        this.userModel.createUser(req.body).then(data => {
            res.render('../views/layouts/user', { style: this.style, ...variables });
        }).catch(err => {
            console.log(err);
        });
    };
}
