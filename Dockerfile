FROM ubuntu:latest

LABEL description="Aria2c&Rclone整合的docker，特別感謝p3terx的腳本" version="1.1" owner="poynt2005"

COPY . /root

#安裝aria2c和rclone所需依賴包
RUN apt-get update -y
RUN apt-get install apt-utils dialog wget curl iptables zip unzip iptables iptables-persistent -y
#安裝aria2c
RUN cd /tmp \
 && wget -N git.io/aria2.sh \
 && chmod +x aria2.sh \
 && echo "1" | ./aria2.sh
#安裝rclone
RUN curl https://rclone.org/install.sh | bash \
 && mkdir -p /root/.config/rclone
#安裝node
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash \
 && apt-get install nodejs -y
#安裝node_module
RUN cd /root/aria2set \
 && npm i
 
ENV NODE_ENV=production
 
WORKDIR /root/aria2set

#開啟koa, json-rpc, bittorrent port
EXPOSE 3000
EXPOSE 6800
EXPOSE 51413

CMD ["npm", "start"]