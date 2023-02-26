import { body, check } from 'express-validator';
import UserModel from '../models/user.model';

const userModel = new UserModel;
const usernameValidator = (t) => {
    return body('login').trim().escape().custom(async value => {
        const user = await userModel.checkIfUsernameExists(value);
        if (user.length) throw t('This login is already in use');
    }).isLength({ min: 5 }).withMessage(() => t('Your login should be at least 5 characters long'));
};

const passwordValidator = (t) => {
    return body('password').trim().escape().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }).withMessage(() => t('Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter and one number'));
};

const confirmPasswordValidator = (t) => {
    return body('passwordConfirm').trim().escape().custom((value, { req }) => {
        const password = req.body.password;

        if (password !== value) throw t('Passwords must be same');
    });
};

const emailValidator = (t) => {
    return body('email').trim().escape().normalizeEmail().isEmail().withMessage(() => t('Enter email in correct format'));
};

export { usernameValidator, passwordValidator, emailValidator, confirmPasswordValidator };