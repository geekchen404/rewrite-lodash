var net = require('net')

var server = net.createServer()
var port = 80

server.on('connection', conn => {
  conn.on('data', data => {
    // 会触发两次data事件，因为响应的数据，会分两次发过来，不要随便断开连接
    let request = data.toString()
    let [header, body] = request.split('\r\n\r\n')
    let [fisrtLine, ...headers] = header.split('\r\n')
    let [method, path] = fisrtLine.split(' ')
    if (method === 'get') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type:text/html;charset=UTF-8\r\n')
    }
  })
})

server.listen(port, () => {
  console.log('server listen on port', port)
})

