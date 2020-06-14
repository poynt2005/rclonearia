import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './css/main.css'

$(document).ready(() => {
	let isSending = false
	
	$('#submitData').click(async() => {
		if(isSending) return
	
		let password = $('#password').val()
		if(!password.length) {
			alert('你他媽沒輸入密碼')
			return
		}
		
		isSending = !isSending
		
		let r = await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({pass: password}),
			headers: {'Content-Type': 'application/json'},
			credentials: "same-origin"
		})
		
		let resJson = await r.json()
		
		if(resJson.isPass)	
			window.location.href = '/'
		else
			alert('輸入錯誤')
		
		isSending = !isSending
		return
	})
	
	$('#clearData').click(() => {
		$('#password').val('')
	})
	
})