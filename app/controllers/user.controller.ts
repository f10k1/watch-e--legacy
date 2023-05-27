import UserModel from '../models/user.model';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export default class UserController {

    userModel = new UserModel;
    style = 'user';

    postRegister = (req, res, next) => {
        const variables: any = {};
        res.setHeader('Content-Type', 'application/json');


        if (req.body === undefined) {
            res.end(JSON.stringify([res.end(JSON.stringify([{ param: 'body', msg: res.locals.t('Invalid request') }]))]));
            return;
        }

        if (req.body.csrf != req.session.csrf) {
            res.end(JSON.stringify([{ param: 'csrf', msg: res.locals.t('Invalid CSRF token') }]));
            return;
        }

        variables['errors'] = validationResult(req)['errors'];

        if (variables.errors.length) {
            res.end(JSON.stringify({ ...variables }));
            return;
        }

        this.userModel.createUser(req.body).then((data: any) => {
            req.login(data, (err) => {
                if (err) { return next(err); }
                variables['redirect'] = '/user';
                res.end(JSON.stringify({ ...variables }));
            });
            return;
        }).catch(e => {
            variables['messages'] = { ...variables.messages, unknown_error: res.locals.t(e) };
            res.end(JSON.stringify({ ...variables }));
        });;
    };

    postLogin = (req, res, next) => {
        const variables: any = {};
        res.setHeader('Content-Type', 'application/json');

        if (req.body === undefined || req.body.login === undefined || req.body.password === undefined) {
            res.end(JSON.stringify([res.end(JSON.stringify([{ param: 'body', msg: res.locals.t('Invalid request') }]))]));
            return;
        }

        if (req.body.csrf != req.session.csrf) {
            res.end(JSON.stringify([{ param: 'csrf', msg: res.locals.t('Invalid CSRF token') }]));
            return;
        }

        this.userModel.getUser(req.body.login).then((data: any) => {
            if (!data) {
                variables['messages'] = { ...variables.messages, bad_login: res.locals.t('Invalid login or password') };
                res.end(JSON.stringify({ ...variables }));
                return;
            }
            bcrypt.compare(req.body.password, data.password, (err, valid) => {
                if (valid) {
                    req.login(data, (err) => {
                        if (err) { return next(err); }
                        variables['redirect'] = '/dashboard';
                        res.end(JSON.stringify({ ...variables }));
                    });
                }
                else {
                    variables['messages'] = { ...variables.messages, bad_login: res.locals.t('Invalid login or password') };
                    res.end(JSON.stringify({ ...variables }));
                }
            });
        }).catch(e => {
            variables['messages'] = { ...variables.messages, unknown_error: res.locals.t(e) };
            res.end(JSON.stringify({ ...variables }));
        });
    };

    getLogin = (req, res, next) => {
        if (req.user) res.redirect("/user");
        const variables = {};
        variables['loginUrl'] = '/ajax/user/login';
        variables['registerUrl'] = '/ajax/user/register';
        res.render('../views/pages/user/login.pug', { style: this.style, ...variables });
        return;
    };

    getUser = (req, res, next) => {
        if (!req.user) res.redirect("/user/login");
        const variables = {};
        res.render('../views/pages/user/index.pug', { style: this.style, ...variables });
    };

    getLogout = (req, res, next) => {
        if (!req.user) res.redirect("/user/login");

        req.logout((err) => {
            if (err) return next(err);
            res.redirect("/user/login");
        });
    };
}
