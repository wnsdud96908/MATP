const express = require('express');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('passport');
const passportConfig = require('./passport');
const axios = require('axios');
dotenv.config();
passportConfig();

const pageRouter = require('./routes/page');
const boardRouter = require('./routes/board');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const searchRouter = require('./routes/search');

// view engine setup
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/search', searchRouter);
app.use('/profile', profileRouter);
app.use('/board', boardRouter);
app.use('/auth', authRouter);
app.use('/', pageRouter);

app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use(
  express.static('public', {
    setHeaders: function (res, path, stat) {
      res.set('Content-Type', 'text/css');
    },
  })
);

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('데이터베이스 연결 성공!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).sendFile(path.join(__dirname, '/error.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '포트 대기중...');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.local.user = null;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
