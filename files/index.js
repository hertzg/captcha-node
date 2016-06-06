function load () {
    var request = new XMLHttpRequest
    request.open('get', 'sessionNode/get')
    request.send()
    request.onload = function () {
        setCaptcha(JSON.parse(request.responseText))
    }
}

function setCaptcha (captchaObject) {
    tokenInput.value = captchaObject.token
    image.src = captchaObject.image
}

var image = document.getElementById('image'),
    tokenInput = document.getElementById('tokenInput'),
    statusElement = document.getElementById('statusElement'),
    valueInput = document.getElementById('valueInput')

var getButton = document.getElementById('getButton')
getButton.addEventListener('click', load)

var verifyForm = document.getElementById('verifyForm')
verifyForm.addEventListener('submit', function (e) {

    e.preventDefault()

    var url = 'accountNode/verify?token=' + encodeURIComponent(tokenInput.value) +
        '&value=' + encodeURIComponent(valueInput.value)

    var request = new XMLHttpRequest
    request.open('get', url)
    request.send()
    request.onload = function () {
        var response = JSON.parse(request.responseText)
        if (response.error === 'INVALID_TOKEN') {
            setCaptcha(response.newCaptcha)
            statusElement.innerHTML = response.error
        } else {
            statusElement.innerHTML = response
        }
    }

})

load()
