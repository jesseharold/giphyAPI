var topics = ["Arya Stark", "Tyrion Lannister", "Brynden Blackfish Tully", "Hodor", "Littlefinger", "Jon Snow", "Brienne of Tarth"];
var apiUrl = "http://api.giphy.com/v1/gifs/search?";
var apiOptions = "&limit=10"
var apiKey = "&api_key=dc6zaTOxFJmzC";

for (var i = 0; i < topics.length; i++) {
	$("#buttons").append("<button class='topic'>" + topics[i] + "</button>");
}

$("#buttons").on("click", "button.topic", function(){
	var query = $(this).text();
	$.ajax({
            url: apiUrl + "q=" + query + apiOptions + apiKey,
            method: 'GET'
        })
        .done(function(response) {
        	console.log(response.data[0]);
        	for (var i = 0; i < response.data.length; i++) {
        		var html = "<div class='img'><img class='anim' src='" + response.data[i].images.downsized.url;
        		html += "' width='response.data[i].images.downsized.width' height='response.data[i].images.downsized.height'>";
        		html += "<img class='still' src='" + response.data[i].images.downsized_still.url + "'>";
        		html += "<div class='rating'>Rating: " + response.data[i].rating.toUpperCase() + "</div></div>";
        		$("#images").append(html);
        	}
       	});

});
$("#images").on("click", "img.still", function(){
	$(this).hide().prev("img.anim").show();
});
$("#images").on("click", "img.anim", function(){
	$(this).hide().next("img.still").show();
});
$("#addChar").on("click", function(){
	$("#buttons").append("<button class='topic'>" + $(this).prev("input").val() + "</button>");
});