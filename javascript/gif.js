// initial array with topics
var topics = ["waving", "joking", "angry", "running"];

// function that renders buttons when called
function renderButtons(){
  // loop until there's nothing in the array
  while(topics.length>0){
    // pop a value out of the array and save it to topic variable
  	var topic = topics.pop();
    // create a button tag with class and apply the topic into the text
    var btnTag = $("<button class='btn btn-primary'>").text(topic);
    // add a data attribute to the button
    btnTag.attr("data-topic", topic);
    // append the button to the div
    $("#topic_list").append(btnTag);
  }
}

// function that runs the query with topic input given
function runQuery(topic){
var queryURL = "https://api.giphy.com/v1/gifs/search";
  // adds the parameters to the query URL
  queryURL += '?' + $.param({
      'q': topic,
      'api_key': "dc6zaTOxFJmzC",
      'limit' : 10,
  });
  $.get(queryURL, function(response) {
    var data = response.data;
    $("#gif").empty();
    // for loop to create the html tags for gif image and the rating using bootstrap classes
    for(i=0;i<data.length;i++){
      var divTag1 = $("<div class='thumbnail'>");
      var divTag2 = $("<div class='caption text-center'>");
      var h3Tag = $("<h3>");
      var imgURL = data[i].images.fixed_height_small.url;
      var simgURL = data[i].images.fixed_height_small_still.url;
      var rating = data[i].rating;
      var imgTag = $("<img class='gifs'>");
      imgTag.attr("src", simgURL);
      imgTag.attr("data-state", "still");
      imgTag.attr("data-still", simgURL);
      imgTag.attr("data-animate", imgURL);
      h3Tag.text("Rating: " + rating);
      divTag1.append(imgTag);
      divTag1.append(divTag2.append(h3Tag));
      $("#gif").append(divTag1);
    }
  });
}

// when img tag inside the body is clicked
$("body").on("click", "img", function(){
  // grab the data values
  var state = $(this).attr("data-state");
  var still = $(this).attr("data-still");
  var animate = $(this).attr("data-animate");
  // if state is still, animate the img and set state as animate
  if(state === "still"){
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
  }
  // if state is animate, stop the gif animation and set state as still
  else{
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
  }
});

// when a button tag inside the body is clicked
$("body").on("click", "button", function(){
  var topic = $(this).data("topic");
  runQuery(topic);
});

// when a button with #addbtn is clicked
$('#addbtn').click(function(){
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  $("#topic-input").val("");
  // push the input to the topics array then render the buttons
  topics.push(topic);
  renderButtons();
});

// to display the buttons when page is loaded
renderButtons();