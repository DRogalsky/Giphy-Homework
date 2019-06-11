let apiKey = 'SsYobnas9DP9HtSaKwqbMGes5I9hIuqG';
let buttonHolder = $('#buttonHolder');
let gifContainer = $('#gifContainer');
let gifArray = ['sugar glider', 'cat', 'guilty gear'];

function buttonCreator() {
    buttonHolder.empty();
    for(gif in gifArray) {
        let button = $('<button>');
        button.addClass('gif-btn');
        button.attr('data-name', gifArray[gif]);
        button.text(gifArray[gif]);
        buttonHolder.append(button);
    }
}

function gifGrabber() {
    let name = $(this).attr('data-name');
    let queryURL = "https://api.giphy.com/v1/gifs/random?api_key="+ apiKey +"&tag=" + name;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {
        console.log(response);
    })
}

window.onload = function() {

    $('#addGif').on('click', function(event) {
        event.preventDefault();
        let gif = $('#newGif').val();
        gifArray.push(gif);
        buttonCreator();
    })

    $(document).on('click', ".gif-btn", gifGrabber)

};

buttonCreator();