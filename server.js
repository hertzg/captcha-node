var http = require('http'),
    url = require('url')

var config = require('./config.js'),
    Error404Page = require('./lib/Error404Page.js'),
    StaticPage = require('./lib/StaticPage.js')

var tokens = Object.create(null)

var pages = Object.create(null)
pages['/'] = require('./lib/IndexPage.js')
pages['/get'] = require('./lib/GetPage.js')(tokens)
pages['/verify'] = require('./lib/VerifyPage.js')(tokens)
pages['/index.css'] = StaticPage('files/index.css', 'text/css')
pages['/index.js'] = StaticPage('files/index.js', 'application/javascript')

http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true)
    var page = pages[parsedUrl.pathname]
    if (page === undefined) page = Error404Page
    page(req, res, parsedUrl)
}).listen(config.port, config.host)
