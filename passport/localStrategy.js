const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {users} = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        passReqToCallback: false,
    }, async (user_id, password, done) => {
        try {
            const exUser = await users.findOne({ where: { user_id: user_id } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.user_pwd);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                };
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            };
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};