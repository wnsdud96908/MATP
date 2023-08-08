const passport = require('passport');
const {users} = require('../models');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

module.exports = () =>{
    passport.serializeUser((user,done)=>{
        done(null, user.user_id);
    });

    passport.deserializeUser((user_id, done) =>{
        users.findOne({
            where : {user_id},
            attributes: ["user_no", "user_id", "user_email", "user_nick", "user_nm", "user_tel", "user_gender", "user_addr", "user_img"],
            }
        )
        .then(user => done(null, user))
        .catch( err => done(err));
    });

    local();
    kakao();
}