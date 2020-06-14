# rclonearia

## 說明
結合Rclone與aria2，可以自動下載完之後上傳到雲端硬碟!

## 用法
首先在Dockerfile設定伺服器的密碼
再來。。。

`
docker build -t poynt2005/rclonearia .
`

做好image後

`
docker run -p 80:3000 -p 6800:6800 -d poynt2005/rclonearia
`

瀏覽器進入docker所在的ip地址就行了
