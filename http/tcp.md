# 传输层代理或者tcp代理
就是中间层做数据包转发
socks协议
socks4/5，就是连接上你的代理服务器（建立tcp连接），可以让他帮你连接你想要连接的主机和端口号
通过这个中间层进行通信


ssh -D 7070 root@9.cddn.me -N

http 的代理协议
CONNECT www.baidu.com:433 HTTP/1.1
==================================
HTTP/1.1 200 Connection Establelished


CONNECT的时候不会发正常的http请求
会触发onConnect事件


浏览器在打开每个网站之前都会打开PAC的js文件

PAC脚本
在switchOmega中配置


如何科学翻墙
pac是干嘛的




