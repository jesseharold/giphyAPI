var giphyApp = {
    topics : ["Arya Stark", "Tyrion Lannister", "Brynden Blackfish Tully", "Hodor", "Littlefinger", "Jon Snow", "Brienne of Tarth", "Jaime Lannister", "Tywin Lannister", "Melisandre", "Ser Barristan", "The Hound"],
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
        $("#images").on("click", "img.giphy-image", function(){
            var url;
            if ($(this).data("state") === "still"){
                url = $(this).data("anim-src");
                $(this).data("state", "anim");
            } else {
                url = $(this).data("still-src");
                $(this).data("state", "still");
            }
            $(this).attr("src", url);
        });
        $("#add-character").on("click", function(){
            var characterName = $(this).prev("input").val();
            giphyApp.topics.push(characterName);
            giphyApp.makeButtons();
        });
        $("#images").on("click", ".see-larger", function(){
            giphyApp.showOverlay($(this).data("largeUrl"));
        });
        $("body").on("click", "#close-overlay", function(){
            $("#overlay")
                .hide()
                .find("#large-image")
                .attr("src", "#");
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
                    var thisImage = giphyApp.createSingleImage(response.data[i]);    
                    $("#images").append(thisImage);
                }
                // keep track of how many images are showing
                giphyApp.currentlyShowing += giphyApp.showHowMany;
                // reset behavior of the more button 
                $("#more")
                    .show()
                    .text("More " + query +" >>")
                    .off()
                    .click(function(){
                        giphyApp.getImages(query, giphyApp.currentlyShowing);
                });
            });

    },//getImages()
    makeButtons : function(){
        $("#buttons").empty();
        for (var i = 0; i < giphyApp.topics.length; i++) {
            var button = $("<button>");
            button
                .addClass("topic")
                .text(giphyApp.topics[i]);
            $("#buttons").append(button);
        }
    },//makeButtons()
    createSingleImage : function(imgObj){
        //build html for a single image item
        var container = $("<div>");
        container.addClass("img");

        var img1 = $("<img>").addClass("giphy-image");
        img1.data("anim-src", imgObj.images.downsized.url)
            .data("still-src", imgObj.images.downsized_still.url)
            .data("state", "still")
            .attr("src", imgObj.images.downsized_still.url)
            .attr("width", imgObj.images.downsized.width);

        var rating = $("<div>");
        rating
            .addClass("rating")
            .text("Rating: " + imgObj.rating.toUpperCase());
        var seeLarger = $("<div>");
        seeLarger
            .addClass("see-larger")
            .text("See Larger >")
            .data("largeUrl", imgObj.images.original.url);
        rating.append(seeLarger);
        
        container.append(img1).append(rating);
        return container;
    }, //createSingleImage()
    showOverlay : function(url){
        $("#overlay")
            .show()
            .find("#large-image")
            .attr("src", url);
    } // showOverlay()
};//giphyApp object

$("document").ready(giphyApp.init);
