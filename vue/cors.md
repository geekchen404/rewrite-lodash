# 同源策略
  为了互联网安全，用户数据不被窃取，网站不会被恶意攻击，规定了同源策略
  当你在一个网站里面的时候，不能向不同的域发送一些请求，
  不同的域：
    http和https不同
    ip和域名不同
    端口号不同
    都属于跨域
  而对于跨域有三种行为受到限制：
    cookie，localstorage，indexDB无法读取
    dom无法读取
    ajax无法请求到
  对于cookie：
    在同一个域下面的不同页面，可以通过Set:Cookie为一级域名
    来让也各个页面之间能够共享cookie
  对于AJAX：
    为了解决跨域请求ajax，除了设置服务器代理，还有三种方式
    jsonp
    web scoket,发websokcet协议的请求，
    cors
      详细的讲，会分为两种方式，一种简单的，一种不简单的
