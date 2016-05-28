module.exports = tokens => {
    return (req, res, parsedUrl) => {
        var params = parsedUrl.query
        var token = params.token
        var tokenObject = tokens[token]
        res.setHeader('Content-Type', 'application/json')
        if (tokenObject === undefined) {
            res.end('"INVALID_TOKEN"')
        } else if (tokenObject.value !== params.value) {
            res.end('"INVALID_VALUE"')
        } else {
            tokenObject.solve()
            res.end('true')
        }
    }
}
