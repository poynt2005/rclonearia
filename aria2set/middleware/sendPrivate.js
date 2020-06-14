var fs = require("fs");
var path = require("path");

module.exports = function(obj){
	var { dirPath } = obj;
	return async function(ctx, next){
		ctx.sendPrivate = function(fileName){
			const file = fs.readFileSync(path.join(process.cwd(), dirPath, fileName), "utf-8");
			ctx.body = file;		
		}
		
		await next();
	}
}