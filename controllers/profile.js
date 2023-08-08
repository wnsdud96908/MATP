const { users } = require("../models");

exports.profile = async (req, res, next) => {
    const {tel, addr} = req.body;
    const {id} = req.params;
    try {
        await users.update({
          user_tel: tel,
          user_addr: addr
        }, {
            where: {user_id: id} 
        });
        return res.redirect(`/profile/${id}`);
    } catch(error) {
        console.error(error);
        next(error);
    };
};

exports.withdraw = async (req, res, next) => {
    const { id } = req.params;

    try {
      await users.update({
            user_pwd: " ",
            user_nm: " ",
            user_tel: " ",
            user_gender: 0,
            user_birthday: 0000-00-00,
            user_email: " ",
            user_addr: " ",
            user_leave: 0,
      }, {
        where: {user_id: id}
      });
      return (res.redirect("/"), req.session.destroy());
    } catch (error) {
      console.error(error);
    }
  };
