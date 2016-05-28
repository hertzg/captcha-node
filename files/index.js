function load () {
    var request = new XMLHttpRequest
    request.open('get', 'get')
    request.send()
    request.onload = function () {
        var response = JSON.parse(request.responseText)
        tokenInput.value = response.token
        image.src = response.image
    }
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

    var url = 'verify?token=' + encodeURIComponent(tokenInput.value) +
        '&value=' + encodeURIComponent(valueInput.value)

    var request = new XMLHttpRequest
    request.open('get', url)
    request.send()
    request.onload = function () {
        var response = JSON.parse(request.responseText)
        statusElement.innerHTML = response
    }

})

load()
