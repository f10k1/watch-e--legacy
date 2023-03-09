import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';


export default class UserController {

    userModel = new UserModel;
    style = 'user';

    postRegister = (req, res, next) => {
        const variables: any = {}
        res.setHeader('Content-Type', 'application/json')


        if (req.body === undefined){
            res.end(JSON.stringify([res.end(JSON.stringify([{param: 'body', msg: res.locals.t('Invalid request')}]))]))
            return
        }

        if (req.body.csrf != req.session.csrf){
            res.end(JSON.stringify([{param: 'csrf', msg: res.locals.t('Invalid CSRF token')}]))
            return
        }

        variables['errors'] = validationResult(req)['errors']

        if (!variables.errors.length) this.userModel.createUser(res.body).then(res => { });

        res.end(JSON.stringify({...variables}))
    };

    getUser = (req, res, next) => {
        const variables = {};
        if (1){
            variables['loginUrl'] = '/ajax/user/register'
            variables['registerUrl'] = '/ajax/user/register'
            res.render('../views/pages/user/login.pug', { style: this.style, ...variables })
            return
        }
        return
        this.userModel.getUser().then(data => {
            res.render('../views/layouts/user.pug', { style: this.style, ...variables });
        });
    };
}
