# rclonearia

## 說明
結合Rclone與aria2，可以自動下載完之後上傳到雲端硬碟!

## 用法
1. 直接run image就行了，docker會自動拉取本地沒有的image  
	必須設定一組密碼用於登入，目的是為了防止有心人士未經允許下使用自己的資源  
	另外，也需建議設定一組json-rpc的密鑰用於連接json-rpc，畢竟任何的AriaNG客戶端只要有json-rpc密鑰和IP地址/網址都能使用aria的服務  
	防人之心不可無\!\!  
	container內預設會開啟3000(用於Koa後端)、6800(用於aria的json-rpc)、51413(用於aria的bittorrent客戶端)  
	x86的host，使用x86版本的images，預設下也是會抓取x86的版本  
	密碼是必須的，不過json-rpc密鑰如果真的不想設定，這句 __*-e "RPCSECRET=<自行設定的json-rpc密鑰>"*__，argument不用下  
	不過還是最好都要設定= =  
	```
	docker run -p 80:3000 -p 6800:6800 -p 51413:51413 -e "ASSESS_SECRET=<自行設定的管理密碼>" -e "RPCSECRET=<自行設定的json-rpc密鑰>" -d poynt2005/rclonearia
	```

	Raspberry Pi版本，使用[balenalib/raspberry-pi-node](https://hub.docker.com/r/balenalib/raspberry-pi-node/) 這個鏡像，  
	該鏡像是Run on ARM CPU的  
	```
	docker run -p 80:3000 -p 6800:6800 -p 51413:51413 -e "ASSESS_SECRET=<自行設定的管理密碼>" -e "RPCSECRET=<自行設定的json-rpc密鑰>" -d poynt2005/rclonearia:rpi
	```

2. 在瀏覽器打開docker所在的IP/網址即可  

## 備註

特別感謝[這個repo](https://github.com/P3TERX/aria2.conf) 所提供的aria腳本，安裝aria2c以及自動上傳的部分是使用該腳本