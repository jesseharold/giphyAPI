var giphyApp = {
    topics : ["Arya Stark", "Tyrion Lannister", "Brynden Blackfish Tully", "Hodor", "Littlefinger", "Jon Snow", "Brienne of Tarth"],
    apiUrl : "http://api.giphy.com/v1/gifs/search?",
    apiOptions : "&limit=10",
    apiKey : "&api_key=dc6zaTOxFJmzC",
    init : function(){
        // create initial buttons
        giphyApp.makeButtons();

        //event listeners
        $("#buttons").on("click", "button.topic", function(){
            var topic = $(this).text();
            giphyApp.getImages(topic);
        });
        $("#images").on("click", "img.still", function(){
            $(this).hide().prev("img.anim").show();
        });
        $("#images").on("click", "img.anim", function(){
            $(this).hide().next("img.still").show();
        });
        $("#addChar").on("click", function(){
            giphyApp.topics.push($(this).prev("input").val());
            giphyApp.makeButtons();
        });
    },//init()
    getImages : function(query){
        $("#images").empty();
        $.ajax({
                url: giphyApp.apiUrl + "q=" + query + giphyApp.apiOptions + giphyApp.apiKey,
                method: 'GET'
            })
            .done(function(response) {
                //build the image html
                for (var i = 0; i < response.data.length; i++) {
                    var container = $("<div>");
                    container.addClass("img");
                    var img1 = $("<img>");
                    img1.addClass("anim").attr("src", response.data[i].images.downsized.url)
                        .attr("width", response.data[i].images.downsized.width);
                    var img2 = $("<img>");
                    img2.addClass("still").attr("src", response.data[i].images.downsized_still.url)
                        .attr("width", response.data[i].images.downsized_still.width);
                    var rating = $("<div>");
                    rating.addClass("rating").text("Rating: " + response.data[i].rating.toUpperCase());
                    
                    container.append(img1).append(img2).append(rating);    
                    $("#images").append(container);
                }
            });

    },//getImages()
    makeButtons : function(){
        $("#buttons").empty();
        for (var i = 0; i < giphyApp.topics.length; i++) {
            var button = $("<button>");
            button.addClass("topic").text(giphyApp.topics[i]);
            $("#buttons").append(button);
        }
    }
};//giphyApp object

$("document").ready(giphyApp.init);