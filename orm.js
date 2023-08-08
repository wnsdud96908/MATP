const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("matp", "root", "96908", {
      host: "127.0.0.1",
      port: "3306",
      dialect: "mysql",
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})