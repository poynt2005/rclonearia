var router = require('koa-router')();

router.get('/', async(ctx, next) => {
	
	const isLogin = ctx.isLogin();

	if(!isLogin){	
		ctx.status = 302;
		ctx.redirect("/auth");
	}
	else{
		ctx.status = 200;
		ctx.sendPrivate('aria2ng.html');
	}
});

module.exports = router;