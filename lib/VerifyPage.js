module.exports = (issue, tokens) => {
    return (req, res, parsedUrl) => {
        var query = parsedUrl.query
        var tokenObject = tokens[query.token]
        res.setHeader('Content-Type', 'application/json')
        if (tokenObject === undefined) {
            res.end(JSON.stringify({
                error: 'INVALID_TOKEN',
                newCaptcha: issue(),
            }))
        } else if (tokenObject.value !== query.value) {
            res.end('"INVALID_VALUE"')
        } else {
            tokenObject.solve()
            res.end('true')
        }
    }
}
