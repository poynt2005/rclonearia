const fs = require("fs")
	, path = require("path");

(function(){
	if(typeof process.env.RPCSECRET != "undefined"){
		const { aria2_conf } = JSON.parse(fs.readFileSync(path.resolve("./allpath.json"), "utf8"));
		
		let conf_data = fs.readFileSync(path.resolve(aria2_conf), "utf8");
		
		conf_data = conf_data.replace(/rpc\-secret=(.+)?/, `rpc-secret=${process.env.RPCSECRET}`);
		
		fs.writeFileSync(path.resolve(aria2_conf), conf_data, "utf8");
	}
})()