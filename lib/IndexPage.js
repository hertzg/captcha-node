module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.end(
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                '<title>Captcha Node</title>' +
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                '<link rel="stylesheet" type="text/css" href="index.css" />' +
            '</head>' +
            '<body>' +
                '<h1>Captcha Node</h1>' +
                '<fieldset>' +
                    '<legend>get</legend>' +
                    '<img id="image" />' +
                    '<div class="next">' +
                        '<button id="getButton">get</button>' +
                    '</div>' +
                '</fieldset>' +
                '<fieldset>' +
                    '<legend>verify</legend>' +
                    '<form id="verifyForm">' +
                        '<input type="text" id="tokenInput" placeholder="token" />' +
                        '<div class="next">' +
                            '<input type="text" id="valueInput" placeholder="value" />' +
                        '</div>' +
                        '<div class="next">' +
                            '<button>verify</button>' +
                            ' <span id="statusElement"><span>' +
                        '</div>' +
                    '</form>' +
                '</fieldset>' +
                '<script type="text/javascript" src="index.js"></script>' +
            '</body>' +
        '</html>'
    )
}
