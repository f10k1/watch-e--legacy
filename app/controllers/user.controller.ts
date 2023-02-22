import UserModel from '../models/user.model';

const userModel = new UserModel;

export default class UserController {
    getUser = (req, res, next) => {
        userModel.getUser().then(data => {
            res.render('../views/pages/user', { users: data });
        });

    };

    createUser = (req, res, next) => {
        if (!req.body.login || !req.body.password || !req.body.email) return res.render('../views/pages/user', { errorBag: 'Wrong data' });
        userModel.createUser(req.body).then(data => {
            console.log(data);
            res.render('../views/pages/user', { data: data });
        }).catch(err => {
            console.log(err);
        });
    };
}
