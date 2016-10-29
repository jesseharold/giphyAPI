var giphyApp = {
    topics : ["Arya Stark", "Tyrion Lannister", "Brynden Blackfish Tully", "Hodor", "Littlefinger", "Jon Snow", "Brienne of Tarth"],
    currentlyShowing : 0, // keep track of how many images are on the page right now
    showHowMany : 10, //change how many get displayed at a time
    apiUrl : "https://api.giphy.com/v1/gifs/search?",
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
    getImages : function(query, startAt){
        if (!startAt){
            // this is the first round for this query
            $("#images").empty();
            giphyApp.currentlyShowing = 0;
        }
        $.ajax({
                url: giphyApp.apiUrl + "q=" + query + "&limit="+ (giphyApp.currentlyShowing+giphyApp.showHowMany) + giphyApp.apiKey,
                method: 'GET'
            })
            .done(function(response) {
                // create current round of images
                for (var i = giphyApp.currentlyShowing; i < response.data.length; i++) {
                    var thisImg = giphyApp.createSingleImage(response.data[i]);    
                    $("#images").append(thisImg);
                }
                // keep track of how many images are showing
                giphyApp.currentlyShowing += giphyApp.showHowMany;
                // reset behavior of the more button 
                $("#more").show().text("More " + query +" >>").off().click(function(){
                        giphyApp.getImages(query, giphyApp.currentlyShowing);
                });
            });

    },//getImages()
    makeButtons : function(){
        $("#buttons").empty();
        for (var i = 0; i < giphyApp.topics.length; i++) {
            var button = $("<button>");
            button.addClass("topic").text(giphyApp.topics[i]);
            $("#buttons").append(button);
        }
    },//makeButtons()
    createSingleImage : function(imgObj){
        //build html for a single image item
        var container = $("<div>");
        container.addClass("img");
        var img1 = $("<img>");
        img1.addClass("anim").attr("src", imgObj.images.downsized.url)
            .attr("width", imgObj.images.downsized.width);
        var img2 = $("<img>");
        img2.addClass("still").attr("src", imgObj.images.downsized_still.url)
            .attr("width", imgObj.images.downsized_still.width);
        var rating = $("<div>");
        rating.addClass("rating").text("Rating: " + imgObj.rating.toUpperCase());
        
        container.append(img1).append(img2).append(rating);
        return container;
    }
};//giphyApp object

$("document").ready(giphyApp.init);