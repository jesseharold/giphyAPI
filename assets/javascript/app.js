var giphyApp = {
    topics : ["Arya Stark", "Tyrion Lannister", "Brynden Blackfish Tully", "Hodor", "Littlefinger", "Jon Snow", "Brienne of Tarth"],
    apiUrl : "http://api.giphy.com/v1/gifs/search?",
    apiOptions : "&limit=10",
    apiKey : "&api_key=dc6zaTOxFJmzC",
    init : function(){
        // create initial buttons
        for (var i = 0; i < giphyApp.topics.length; i++) {
            giphyApp.addButton(giphyApp.topics[i]);
        }

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
            giphyApp.addButton($(this).prev("input").val());
        });
    },//init()
    getImages : function(query){
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
                    container.append(img1);
                    var img2 = $("<img>");
                    img2.addClass("still").attr("src", response.data[i].images.downsized_still.url)
                        .attr("width", response.data[i].images.downsized_still.width);
                    container.append(img2);
                    var rating = $("<div>");
                    rating.addClass("rating").text("Rating: " + response.data[i].rating.toUpperCase());
                        
                    $("#images").append(container);
                }
            });

    },//getImages()
    addButton : function(label){
        var button = $("<button>");
        button.addClass("topic").text(label);
        $("#buttons").append(button);
    }
};//giphyApp object

$("document").ready(giphyApp.init);