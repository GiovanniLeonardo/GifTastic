// Initiate array of movies
var movies = ["Black Panther", "Incredibles 2","Mission Impossible","Avengers Infinity War",];

//function for displaying the movie
function displayGif(){
	//delete the movie buttons prior to adding new one
	$("#movie-view").empty(); 
	var gif = $(this).attr("data-name");
	var key = "dc6zaTOxFJmzC";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gif + "&limit10=&api_key="+ key;

	// Ajax API call
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		//loop
		for(i=0;i<response.data.length;i++){
		//create a div for the gifs
		var gifdiv = $("<div>");
		var animateURL = response.data[i].images.original.url;
		var stillURL = response.data[i].images.original_still.url;
		var image = $("<img>").attr("src", stillURL);
		image.attr("alt","gif");
		//make the image still
		image.attr("data-state","still");
		image.attr("data-still",stillURL);
		image.attr("data-animate",animateURL);
		//gives the image a gif class
		image.addClass("gif");
		$("#movie-view").append(gifdiv);
		$("#movie-view").append("<br>");
		//retrives the moving rating from the gif
		var rating = response.data[i].rating;
		//create a rating display Div
		var ratediv = $("<div>");
		// adds the movie rating to the HTML 
		var p = $("<p>").html("Rating: " + rating);
		ratediv.html(p);
		console.log(rating);
		gifdiv.append(image);
		//appends the Div to HTML
		$("#movie-view").append(ratediv);
		$("#movie-view").append("<br>");

	}
	});
	//
	$(document).on('click',".gif", function(){

		var state = $(this).attr("data-state");

		if(state === "still"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}else{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
}
//function for displaying movie data
function renderButtons(){
	$("#buttons-view").empty();
	// loop through the array of movies
	for(i=0;i<movies.length;i++){
		//dynamically generate buttons for each movie in the array
		var a = $("<button>");
		a.attr("data-name", movies[i]);
		a.addClass("movie");
		a.text(movies[i]);
		//adding the button to the HTML
		$("#buttons-view").append(a);
	}
}
//calling renderButtons which handles the processing of the movie array
renderButtons();
//handle events events where one button is clicked
$("#add-movie").on("click", function(event){
	//prevents the form from trying to submit itself.
	event.preventDefault();
movie
	//Grap the text from the input box and removes spaces
	var movie = $("#movie-input").val().trim();
	//push the movie from the textbox to the array
	movies.push(movie);
	
	
	//calls the renderButtons function at lease once to display the initial list of movies.
	renderButtons();

});

//attach the click event to the movie and display content. 
$(document).on("click",".movie",displayGif);