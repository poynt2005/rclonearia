var router = require('koa-router')();
var fs = require("fs");

router.get("/", async(ctx, next) => {
	ctx.status = 301;
	ctx.redirect("/welcome.html");
});


module.exports = router;
