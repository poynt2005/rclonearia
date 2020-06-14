FROM ubuntu:18.04

COPY . /root

RUN cd /tmp \
&& apt-get update -y \ 
&& apt-get install apt-utils dialog wget curl iptables zip unzip iptables iptables-persistent -y \
&& wget -N git.io/aria2.sh \
&& chmod +x aria2.sh \
&& echo "1" | ./aria2.sh \
&& curl https://rclone.org/install.sh | bash \
&& curl -sL https://deb.nodesource.com/setup_14.x  | bash \
&& apt-get install nodejs -y \
&& cd /root/aria2set \
&& npm install \
&& mkdir -p /root/.config/rclone

ENV ASSESS_SECRET=123456789

WORKDIR /root/aria2set

EXPOSE 3000
EXPOSE 6800

CMD ["npm", "start"]


