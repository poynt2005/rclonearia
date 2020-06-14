var router = require('koa-router')();
var util = require('util');
var fs = require("fs");
var exec = util.promisify(require('child_process').exec);
var path = require("path");

var filePath = JSON.parse(fs.readFileSync(path.join(__dirname, "../allpath.json")));

router.get('/', async(ctx, next) => {	 
	const isLogin = ctx.isLogin();

	if(!isLogin){
		ctx.status = 302;
		ctx.redirect("/auth");
	}
	else{
		
		var aria2Conf = fs.readFileSync(path.join(filePath.aria2_conf), "utf8");
		var rpcSecret = aria2Conf.match(/rpc\-secret=(.+)?/)[0].replace("rpc-secret=", "");
		
		ctx.status = 200;
		await ctx.render('setting', {rpcSecret});
	}
});

router.post("/", async(ctx, next) => {
	if(!ctx.isLogin()){
		ctx.status = 403;
		return;
	}
	
	var { drive_name, drive_path, rclone_conf } = ctx.request.body.data;
	var result = {
		autoUploadSH: "",
		rcloneConf: "",
		aria2Conf: ""
	};
	
	
	try{
		var autoUploadSH = fs.readFileSync(path.join(filePath.autoupload), "utf8");
		autoUploadSH = autoUploadSH.replace(/DRIVE_NAME=(.+)?/, `DRIVE_NAME='${drive_name}'`);
		autoUploadSH = autoUploadSH.replace(/DRIVE_PATH=(.+)?/, `DRIVE_PATH='${drive_path}'`);
		
		fs.writeFileSync(path.join(filePath.autoupload), autoUploadSH);
		result.autoUploadSH = "Already Set";
		
	}
	catch(e){
		console.log(e.message);
		result.autoUploadSH = "Not Set, message: " + e.message;
	}
	
	try{
		fs.writeFileSync(path.join(filePath.rclone_conf), rclone_conf);
		
		if(fs.existsSync(path.join(filePath.rclone_conf)))
			result.rcloneConf = "Already Set";
	}
	catch(e){
		console.log(e.message);
		result.rcloneConf = "Not Set, message: " + e.message;
	}
	
	try{
		var aria2Conf = fs.readFileSync(path.join(filePath.aria2_conf), "utf8");
		aria2Conf = aria2Conf.replace(/on\-download\-complete=(.+)?/, `on-download-complete=${filePath.autoupload}`);
		
		fs.writeFileSync(path.join(filePath.aria2_conf), aria2Conf);
		result.aria2Conf = "Already Set";
	}
	catch(e){
		console.log(e.message);
		result.aria2Conf = "Not Set, message: " + e.message;
	}
	
	ctx.status = 200;
	ctx.body = result;
});

router.post("/start", async(ctx, next) => {
	if(!ctx.isLogin()){
		ctx.status = 403;
		return;
	}
	
	var t = await exec('service aria2 start');
	
	ctx.status = 200;
	ctx.body = {
		stdout: t,
		message: "已執行啟動指令"
	};
});

router.post("/stop", async(ctx, next) => {
	if(!ctx.isLogin()){
		ctx.status = 403;
		return;
	}
	
	var t = await exec('service aria2 stop');
	
	ctx.status = 200;
	ctx.body = {
		stdout: t,
		message: "已執行停止指令"
	};
});

module.exports = router;