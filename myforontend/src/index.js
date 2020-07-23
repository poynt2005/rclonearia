import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './css/main.css'

$(document).ready(() => {
	
	var isPosting = false
	  
	$('#submitData').click(async () => {
		var driveName = $('#driveName')
		  , uploadDir = $('#uploadDir')
		  , rloneconf = $('#rloneconf')
		
		if(isPosting) return
		
		if(!driveName.val().length || !uploadDir.val().length || !rloneconf.val().length){
			alert("有欄位未輸入!!")
			return;
		}
		
		isPosting = !isPosting;

		
		var r = await fetch("/setting/", {
			method: "POST",
			body: JSON.stringify({data: {
				drive_name: driveName.val(),
				drive_path: uploadDir.val(),
				rclone_conf: rloneconf.val()
			}}),
			headers: {"Content-Type": 'application/json'},
			credentials: 'same-origin'
		})
		
		var jsonRst = await r.json()
		
		$('#autouploadRst').text(jsonRst.autoUploadSH)
		$('#rcloneConfRst').text(jsonRst.rcloneConf)
		$('#aria2ConfRst').text(jsonRst.aria2Conf)
		
		isPosting = !isPosting
	})
	
	$('#clearData').click(() => {
		var driveName = $('#driveName')
		  , uploadDir = $('#uploadDir')
		  , rloneconf = $('#rloneconf');
		  
		driveName.val('')
		uploadDir.val('')
		rloneconf.val('')
	})
	
	$('#serviceOn').click(() => {
		fetch("/setting/start", {
			method: "POST",
			credentials: 'same-origin'
		}).then(e => alert(JSON.stringify(e)))
	})
	
	$('#serviceClose').click(() => {
		fetch("/setting/stop", {
			method: "POST",
			credentials: 'same-origin'
		}).then(e => alert(JSON.stringify(e)))
	})
})