var crypto = require('crypto')
var Canvas = require('canvas')

var Log = require('./Log.js')

var canvasWidth = 140,
    canvasHeight = 50,
    padding = 10,
    numChars = 5,
    canvas = new Canvas(canvasWidth, canvasHeight),
    charY = canvasHeight / 2,
    charset = '23456789abcdefghijkmnpqrstuvwxyz'

var fonts = []
for (var i = 0; i < 15; i++) fonts.push('normal ' + (i + 19) + 'px serif')

var c = canvas.getContext('2d')
c.font = 'normal 20px serif'
c.textBaseline = 'middle'
c.textAlign = 'center'

module.exports = tokens => {
    return () => {

        function destroy () {
            delete tokens[token]
        }

        c.fillStyle = 'white'
        c.fillRect(0, 0, canvasWidth, canvasHeight)

        var value = ''
        var spaceX = (canvasWidth - padding * 2) / numChars
        c.fillStyle = 'black'
        for (var i = 0; i < numChars; i++) {

            var shiftX = (Math.random() - 0.5) * 20,
                shiftY = (Math.random() - 0.5) * 15

            var ch = charset[Math.floor(Math.random() * charset.length)]
            value += ch
            c.save()
            c.font = fonts[Math.floor(Math.random() * fonts.length)]
            c.translate(padding + spaceX * (i + 0.5) + shiftX, charY + shiftY)
            c.rotate((Math.random() * 2 - 1) * Math.PI * 0.2)
            c.fillText(ch, 0, 0)
            c.restore()

        }

        var token = crypto.randomBytes(10).toString('hex')
        var timeout = setTimeout(() => {
            Log.info('Token ' + token + ' timed out')
            destroy()
        }, 1000 * 60 * 5)
        tokens[token] = {
            value: value,
            solve: () => {
                Log.info('Token ' + token + ' solved')
                clearTimeout(timeout)
                destroy()
            }
        }
        Log.info('Token ' + token + ' issued')

        return {
            token: token,
            image: canvas.toDataURL(),
        }

    }
}
