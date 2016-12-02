// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  //console.log('Keepin\'n it clean with an external script!');

  var allTopics = {};

  $.ajax({
    url: 'http://www.mattbowytz.com/simple_api.json?data=all',
    method: 'GET'
  }).success(function(data) {
    allTopics.interests = data.data.interests;
    allTopics.programming = data.data.programming;
    console.log("data=all added");
  }).fail(function(data) {
    console.log("error");
  });

  $.ajax({
    url: 'http://www.mattbowytz.com/simple_api.json?data=comics',
    method: 'GET'
  }).success(function(data) {
    allTopics.comics = data.data;
    console.log("data=comics added");
  }).fail(function(data) {
    console.log("error");
  });

  console.log(allTopics);



  var searchString; // String input by user
  var predictedStrings = {};  // contains all pred. strings by category

  $('.flexsearch-input').on('keyup', function() {

    $('.flexsearch-predictions').hide();
    $('.flexsearch-predictions').empty();

    searchString = $('.flexsearch-input').val();

    var j = 0;
    var predicted = false;


    // Generate list of words that can be predicted with current string
    if(searchString.length > 0) {
      for(var topic in allTopics) {
        predictedStrings[topic] = [];

        var stringArr = allTopics[topic]
        for(var stringIndex in stringArr) {

          var thisString = stringArr[stringIndex];

          var valid = true;
          var i = 0;
          while(valid === true && i < searchString.length) {
            if(searchString[i].toUpperCase() !== thisString[i].toUpperCase())
              valid = false;
            i++;
          }
          if(valid === true) {
            predictedStrings[topic].push(thisString);
            predicted = true;
          }
        }
        j++;
      }

      console.log(predictedStrings);

      // Go through object of arrays for each category, create HTML string
      // and append to tag.
      if(predicted === true) {
        for(var topics in predictedStrings) {
          var stringArr = predictedStrings[topics];

          var toAppend = "";

          if(stringArr.length > 0) {
            toAppend += ('<h4>' + topics +
              '</h4><ul>');
            for(var strings in stringArr) {
              toAppend += ('<li>' +
              '<a href ="http://www.google.com/#q=' + stringArr[strings]
              + '">' + stringArr[strings]
              + '</a></li>');
            }
            toAppend += '</ul>';

            $('.flexsearch-predictions').append(toAppend);
          }
        }

      } else {
        $('.flexsearch-predictions').html('<h4>no results</h4>');
      }

      $('.flexsearch-predictions').show();

    }
  });

})();
