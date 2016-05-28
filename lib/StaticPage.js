var fs = require('fs')

module.exports = (file, contentType) => {
    var content = fs.readFileSync(file)
    return (req, res) => {
        res.setHeader('Content-Type', contentType)
        res.end(content)
    }
}
