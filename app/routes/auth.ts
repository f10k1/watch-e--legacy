import passport from "passport";
import LocalStrategy from "passport-local";
import UserModel from "../models/user.model";
import bcrypt from 'bcrypt';
const userModel = new UserModel;

const instance = passport;

instance.use(new LocalStrategy(
    function verify(username, password, done) {
        userModel.getUser(username).then(async (user) => {
            if (!user) return done(null, false);
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) return done(null, false);
            return done(null, user);
        });
    }
));

instance.serializeUser((user, done) => {
    console.log(user)
    process.nextTick(() => {
        console.log(user)
        done(null, { id: user.id, username: user.name });
    });
});

instance.deserializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user);
    });
});

export default instance;