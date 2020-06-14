import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './css/main.css'

import downloadPic from './pics/d.jpg'
import settingPic from './pics/s.png'

$(document).ready(() => {
	$('#goToAria').attr('src', downloadPic)
	$('#goToSetting').attr('src', settingPic)
})