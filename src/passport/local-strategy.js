import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserDao from '../DAO/mongodb/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
};

const login = async (req, userr, password, done) => {
    try {
        const user = { userr, password };
        const userLogin = await userDao.loginUser(user);
        //console.log(userLogin);
        if (userLogin) {
            return done(null, userLogin);
        }
        return done(null, false);
    } catch (error) {
        console.log(error.message);
    }
};

const register = async (req, email, password, done) => {
    try {
        const user = await userDao.getByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.registerUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error.message);
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
