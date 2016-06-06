var http = require('http'),
    url = require('url')

var config = require('./config.js'),
    Error404Page = require('./lib/Error404Page.js'),
    Log = require('./lib/Log.js'),
    StaticPage = require('./lib/StaticPage.js')

var tokens = Object.create(null)
var issue = require('./lib/Issue.js')(tokens)

var pages = Object.create(null)
pages['/'] = require('./lib/IndexPage.js')
pages['/accountNode/verify'] = require('./lib/VerifyPage.js')(issue, tokens)
pages['/frontNode/get'] = require('./lib/GetPage.js')(issue)
pages['/index.css'] = StaticPage('files/index.css', 'text/css')
pages['/index.js'] = StaticPage('files/index.js', 'application/javascript')

http.createServer((req, res) => {
    Log.http(req.method + ' ' + req.url)
    var parsedUrl = url.parse(req.url, true)
    var page = pages[parsedUrl.pathname]
    if (page === undefined) page = Error404Page
    page(req, res, parsedUrl)
}).listen(config.port, config.host)
