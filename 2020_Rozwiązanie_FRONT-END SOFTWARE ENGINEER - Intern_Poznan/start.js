const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 3000

const handler = (req, res) => {

    if(req.url === "/"){
        fs.readFile("index.html", "UTF-8", (err, html) => {
            res.writeHead(200, {"Content-Type": "text/html"})
            res.end(html)
        });
    }else if(req.url.match(".css")){
        const cssPath = path.join(__dirname, '/css' , req.url)
        const fileStream = fs.createReadStream(cssPath, "UTF-8")
        res.writeHead(200, {"Content-Type": "text/css"})
        fileStream.pipe(res);

    }
    else if(req.url.match(".js")){
        const jsPath = path.join(__dirname, '/js', req.url)
        const fileStream = fs.createReadStream(jsPath)
        res.writeHead(200, {"Content-Type": "text/javascript"})
        fileStream.pipe(res)
    }else{
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("No Page Found")
    }

}

const server = http.createServer(handler) 

server.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is running on port ' + port)
    }
})