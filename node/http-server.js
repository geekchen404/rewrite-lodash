const http = require('http')

const queryString = require('querystring')

const server = http.createServer(getRequest)

const port = 8099

const msgs = [{
  content: 'hrllo',
  name: '张三'
}]


function getRequest(request, response) {
  if (request.method == 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    response.write(`
    <form action="/">
      <input name="content" />
      <input name="name" /> 
    </form>
    <button type="submit">提交</button>
    <ul>
      ${
      msgs.map(msg => {
        return `
            <li>
            <h3>${msg.name}</h3>
            <pre>${msg.content}</pre>
            </li>
          `
      }).join('')
      }
    </ul>
    `)
  }

  if (request.method == 'POST') {
    request.on('data', data => {
      let msg = queryString.parse(data.toString())
      msgs.push(msg)
      response.writeHead(301, {
        'Location': '/'
      })
      response.end()
    })
  }
}


server.listen(port, () => {
  console.log('server listening on port', port)
})