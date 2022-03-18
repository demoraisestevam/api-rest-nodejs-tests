const http = require("http")

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })

    if(request.url === '/products') {
      response.end(
        JSON.stringify({
          message: "Products route"
        })
      )
    }

    if(request.url === '/users') {
      response.end(
        JSON.stringify({
          message: "Users route"
        })
      )
    }

    response.end(
      JSON.stringify({
        message: "Not found"
      })
    )

  })
  .listen(4001, () => console.log('Server run port 4001'))
