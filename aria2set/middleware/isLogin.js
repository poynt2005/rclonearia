module.exports = function(){
	const obj = {
		path: '/', 
		maxAge: 86400000,
		httpOnly: false,
		overwrite: false,
		signed: true
	};
	
	return async function(ctx, next){
		
		
		if(typeof ctx.cookies.get("isPass") == "undefined"){
			ctx.cookies.set("isPass", "0", obj);
		}
		ctx.setLogin = function(tf){
			!!tf ? ctx.cookies.set("isPass", "1", obj) : ctx.cookies.set("isPass", "0", obj);
		};
		
		ctx.isLogin = function(){
			var isLogin = ctx.cookies.get("isPass") === "1" ? true : false;
			return isLogin;
		}
		
		ctx.logout = function(){
			ctx.cookies.set("isPass", "0", obj);
		}
		
		await next();
	}
}