var router = require('koa-router')();

router.get('/', async(ctx, next) => {
	ctx.logout();
	ctx.status = 302;
	ctx.redirect("/");
});

module.exports = router;