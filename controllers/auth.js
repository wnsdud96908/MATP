const bcrypt = require("bcrypt");
const passport = require("passport");
const { users, auth } = require("../models");
const axios = require('axios');

exports.join = async(req, res, next) => {
    const {id, nick, pwd, name, birthday, phone, email, addr, gender} = req.body;

    try{
        const hash = await bcrypt.hash(pwd, 12);
        await users.create({
            user_type_no: 1,
            user_id: id,
            user_pwd: hash,
            user_nm: name,
            user_nick: nick,
            user_tel: phone,
            user_gender: gender,
            user_birthday: birthday,
            user_email: email,
            user_addr: addr,
            user_leave: 1,
        });
        res.json();
    } catch(error) {
        console.error(error);
        return next(error);
    }
}

exports.idChk = async (req, res, next) => {
    const { id } = req.body;
    
    try {
        const exUser = await users.findOne({
            where: { user_id: id },
        });
        if (id === "") {
            res.json({ joined: true, message: "아이디를 입력해 주세요" });            
        } else if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 아이디입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 아이디입니다." });
        };
    } catch (error) {
        console.error(error);
    }
};
  
exports.nickChk = async (req, res, next) => {
    const { nick } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_nick: nick },
        });
        if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 닉네임입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 닉네임입니다." });
        };
    } catch (error) {
        console.error(error);
    }
};

exports.phoneChk = async (req, res, next) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const { phone } = req.body;

    let code = '';
    let date = new Date();
    let now = Date.now();
    let expire = date.setMinutes(date.getMinutes() + 1);

    for (let i = 0; i < 4; i++) code += Math.floor(Math.random() * 10);

    try {
        const exUser = await users.findOne({
            where: { user_tel: phone },
        });
        const expired = await auth.findOne({
            where: {tel_number: phone},
        });

        if (exUser) {
            res.json({ joined: true, message: "이미 가입된 전화번호입니다." });
        } else if (expired && expired.ok) {
            res.json({ joined: false, message: "이미 인증이 완료되었습니다.", already: "false" });
        } else if (expired && expired.expire > now) {
            res.json({ joined: true, message: "이미 발급받은 번호가 있습니다." });
        } else if (expired && expired.expire < now) {
            await auth.update({
                expire: expire, auth: code}, {where: {tel_number: phone}}
            )

            await client.messages
            .create({
                body: `MATP 인증문자 입니다. 인증번호를 입력하여 주세요. ${code}`,
                from: '+12706068123',
                to: '+821053930614'
            }, function (err, message) {
                if (err) {
                    res.json({ joined: true, message: "서버에러, 인증 요청 실패." });
                } else{
                    res.json({ joined: true, message: "인증번호가 발급되었습니다. 확인해주세요.", already: "true" });
                }
            });
        } else if (!expired) {
            await auth.create({
                tel_number: phone,
                auth: code,
                expire: expire,
            });

            await client.messages
            .create({
                body: `MATP 인증문자 입니다. 인증번호를 입력하여 주세요. ${code}`,
                from: '+12706068123',
                to: '+821053930614'
            }, function (err, message) {
                if (err) {
                    res.json({ joined: true, message: "서버에러, 인증 요청 실패." });
                } else{
                    res.json({ joined: true, message: "인증번호가 발급되었습니다. 확인해주세요.", already: "true" });
                }
            });
        };
    } catch (error) {
        console.error(error);
    }
};

exports.authChk = async (req, res, next) => {
    const {authNum, phone} = req.body;

    try{
        const exAuth = await auth.findOne({
            where: {tel_number: phone},
        });

        let expired;
        let now = Date.now();
        
        if(exAuth){
            expired = exAuth.expire;
        }

        if(exAuth === null){
            return res.json({joined: true, message: "인증번호 받기 버튼을 눌러주세요."});
        }
        if(exAuth.ok){
            return res.json({joined: true, message: "이미 인증이 완료되었습니다."});
        }
        if(authNum !== exAuth.auth){
            return res.json({joined: true, message: "인증번호를 다시 확인해주세요."});
        }
        if(exAuth && expired < now){
            return res.json({joined: true, message: "인증번호가 만료되었습니다."});
        }
        if(authNum === exAuth.auth){
            await auth.update({ok: true}, {where: {auth: authNum}})
            return res.json({ joined: false, message: "인증이 완료되었습니다." });
        }
    } catch (error) {
        console.error(error);
    }
}

exports.emailChk = async (req, res, next) => {
    const { email } = req.body;
  
    try {
        const exUser = await users.findOne({
            where: { user_email: email },
        });
        if (exUser) {
            res.json({ joined: true, message: "이미 사용중인 이메일입니다." });
        } else {
            res.json({ joined: false, message: "사용이 가능한 이메일입니다." });
        };
    } catch (error) {
        console.error(error);
    }
};

exports.exUserChk = async (req, res, next) => {
    const {id, password} = req.body;
    const exUser = await users.findOne({
        where: {user_id: id}
    });
    try{
        if(!exUser){
            return res.json({message: "존재하지 않는 아이디입니다."});
        } else {
            const result = await bcrypt.compare(password, exUser.user_pwd);
            if(!result){
                return res.json({message: "비밀번호가 틀렸습니다."});
            };
        };
        next();
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        };
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        };
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            };
            return res.redirect("/");
        });
    })(req, res, next);
};

exports.logout = async (req, res) => {  
    req.logout(() => {
        res.redirect("/");
    });
};


const session = require("express-session");

exports.kakaoLogout = async (req, res) => {

    console.log("kakaoLogout----->",  res.locals.session);
    try {
        const ACCESS_TOKEN = req.session.accessToken;
        let logout = await axios({
          method:'post',
          url:'https://kapi.kakao.com/v1/user/unlink',
          headers:{
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });
      } catch (error) {
        console.error(error);
        res.json(error);
      }
      // 세션 정리
      req.logout();
      req.session.destroy();
      
      res.redirect('/');
}

exports.searchId = async (req, res) => {
    const {email, name} = req.body;
    try{
        const exUser = await users.findOne({
            where: {user_email: email, user_nm: name}
        });
    
        if(exUser){
            res.json({id: exUser.user_id});
        } else {
            res.json({message: "이메일 주소로 가입된 아이디가 없습니다."});
        }
    } catch (error) {
        console.error(error);
    }
}

exports.searchPw = async (req, res) => {
    const {email, id} = req.body;
    try{
        const exUser = await users.findOne({
            where: {user_email: email, user_id: id}
        });

        if(exUser){
            const randomPw = crypto.randomUUID().substring(0,7);
            const hash = await bcrypt.hash(randomPw, 12);

            await users.update({
                user_pwd: hash,
            }, {
                where: {user_id: id}
            })
            res.json({pw: randomPw});
        } else {
            res.json({message: "입력된 정보로 가입된 아이디가 없습니다."});
        }
    } catch (error) {
        console.error(error);
    }
}