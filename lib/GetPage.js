module.exports = issue => {
    return (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(issue()))
    }
}
