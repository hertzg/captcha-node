module.exports = tokens => {
    return (req, res, parsedUrl) => {
        var query = parsedUrl.query
        var tokenObject = tokens[query.token]
        res.setHeader('Content-Type', 'application/json')
        if (tokenObject === undefined) {
            res.end('"INVALID_TOKEN"')
        } else if (tokenObject.value !== query.value) {
            res.end('"INVALID_VALUE"')
        } else {
            tokenObject.solve()
            res.end('true')
        }
    }
}
