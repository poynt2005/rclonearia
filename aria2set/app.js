var Koa = require('koa')
  , Router = require('koa-router')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror')
  , path = require("path")
  , render = require('koa-ejs')
  , sendPrivate = require("./middleware/sendPrivate")
  , isLogin = require("./middleware/isLogin");

var index = require('./routes/index')
  , auther = require("./routes/auth")
  , aria = require("./routes/aria")
  , setting = require("./routes/setting")
  , logout = require('./routes/logout');
 
var app = new Koa();


// error handler
onerror(app);

app.keys = ["wKB7w8UWq4XP8jB4Ac4TTwEiGUisNgEB"];


app.use(isLogin());
app.use(sendPrivate({dirPath: "private"}))
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html'
});


app.use(async (ctx, next) => {
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
var router = new Router();
router.use("/", index.routes(), index.allowedMethods());
router.use("/auth", auther.routes(), auther.allowedMethods());
router.use("/aria", aria.routes(), aria.allowedMethods());
router.use("/setting", setting.routes(), setting.allowedMethods());
router.use("/logout", logout.routes(), logout.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
