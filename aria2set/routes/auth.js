var router = require('koa-router')();

router.get('/', async(ctx, next) => {
	if(ctx.isLogin()){
		ctx.status = 302;
		ctx.redirect("/");
	}
	
	else{
		ctx.status = 302;
		ctx.redirect("auth.html");
	}
});

router.post('/', async(ctx, next) => {
	const password = process.env.ASSESS_SECRET || "[s3~!qF[P8(h8T3)J9m&d4z-!GW:";
	
	if(ctx.request.body.pass.toString() != password){
		ctx.status = 200;
		ctx.body = {isPass: false};
		return;
	}

	ctx.setLogin(true);
	ctx.status = 200;
	ctx.body = {isPass: true};
});

module.exports = router;