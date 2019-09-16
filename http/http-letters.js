let net = require('net')
var querystring = require('querystring')


let server = net.createServer()

let port = 80
let result = []


// 这里面需要响应的两个参数，一个是请求方式，一个是响应数据
server.on('connection', conn => {
  conn.on('data', data => {
    // 这个是客户端发来的请求
    let request = data.toString()
    let [headers, res] = request.split('\r\n\r\n')
    let [method, ...other] = headers.split(' ')
    let eachData = querystring.parse(res)
    // 这个是服务器发出去的响应
    conn.write('HTTP/1.1 200 OK\r\n')
    conn.write('Content-Type: text/html\r\n')
    conn.write(`Date: ${new Date().toISOString()}\r\n`)
    conn.write('\r\n')
    conn.write(
      `
        <form action="/" method="post">
          <p>name</p>
          <input type="text" name="name" autofocus>
          <p>content</p>
          <input type="text" name="content">
          <button type="submit">提交</button>
        </form>
      `
    )
    if (eachData && eachData.content !== undefined) {
      result.push(eachData)
      result.forEach((it) => {
        let eachNode = `
          <div>
            <h1>${it.content}</h1>
            <h3>${it.name}<small>${new Date().toISOString()}</small></h3>
          </div>
          `
        conn.write(eachNode)
      })
    }
    conn.end()
  })
})

server.listen(port, () => {
  console.log('server listening on port', port)
})
