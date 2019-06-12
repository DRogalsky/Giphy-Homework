let apiKey = 'SsYobnas9DP9HtSaKwqbMGes5I9hIuqG';
let buttonHolder = $('#buttonHolder');
let gifContainer = $('#gifContainer');
let gifArray = ['sugar glider', 'cat', 'mouse'];

function buttonCreator() {
    buttonHolder.empty();
    for (gif in gifArray) {
        let button = $('<button>');
        button.addClass('gif-btn');
        button.attr('data-name', gifArray[gif]);
        button.text(gifArray[gif]);
        buttonHolder.append(button);
    }
}

function gifGrabber() {
    let name = $(this).attr('data-name').replace(/\s/g, '-');
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + name + '&limit=10&rating=pg';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let imageArray = response.data;
        for (image in imageArray) {
            let newDiv = $('<div>');
            let newImg = $('<img>').attr('src', imageArray[image].images.fixed_height_still.url);
            newImg.attr({
                'data-still': imageArray[image].images.fixed_height_still.url,
                'data-animated': imageArray[image].images.fixed_height.url,
                'data-state': 'still',
                'class': 'gif'
            })
            let newP = $('<p>').text('rating: ' + imageArray[image].rating);
            newDiv.append(newP);
            newDiv.append(newImg);
            $('#gifContainer').prepend(newDiv);
        }
    })
}

window.onload = function () {

    $('#addGif').on('click', function (event) {
        event.preventDefault();
        let gif = $('#newGif').val();
        gifArray.push(gif);
        buttonCreator();
    })



    $(document).on('click', ".gif-btn", gifGrabber);

    $(document).on("click", '.gif', function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


};

buttonCreator();