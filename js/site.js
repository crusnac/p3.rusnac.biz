//Set the zip code variable to be that will be used as part of the QUERY
$(document).ready(function () {

    //Hide main error div
    $(".error").hide();


    //Check to see if a zip code has been set, if not set a default to display some weather

    if ($.cookie('zipcode')) {

        //Set the zip to the cookie value.
        var zip = $.cookie('zipcode');
        displayWeather(zip);

        //Set a Default zip so that there is defalt data. 
    } else {

        var zip = "02138";
        displayWeather(zip);

    } // End of If




    //Pass the input as a variable.
    $("#weatherSubmit").click(function () {

        //Set main zip variable based upon user input		
        var zip = $('#zipcode').val();

        //Validate proper zipcode
        var reg = /^[0-9]+$/;

        if (zip == '') {
            $("#error").html('<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>A Zip Code is Required. Please enter in valid Zip Code.</div>');

            return false;

        }

        if ((zip.length) < 5 || (zip.length) > 5) {
            $("#error").html('<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Please enter in a valid zip code! Ex. 97045</div>');

            return false;

        }


        //Update ZipCode Cookie to save state of which zipcode has been entered - expired 7 days
        $.cookie("zipcode", zip, { expires: 7 });

        //Send user input to function 
        displayWeather($('#zipcode').val());

    });
});

//Display Weather and 5 day forecast
function displayWeather(zip) {


    //Set main zip Variable
    var weatherLocation = zip;

    // Base URI for Web service
    var yql_base_uri = "http://query.yahooapis.com/v1/public/yql?q=";

    // Create a variable to make results available
    var yql_results = "";

    // Create a YQL query to get weather forcast data based upon zip location
    var yql_query = "select * from weather.forecast where location=";

    //Combined Query
    var query = yql_base_uri + encodeURIComponent(yql_query + weatherLocation) + "&format=json&diagnostics=true&callback=";



    //Go through JSON and 		
    $.getJSON(query, function (data) {

        //Check to make sure zipcode is valid based upon 
        if (("City not found" === data.query.results.channel.item.title) || data === []) {
            processError();
            
            //Set new cookie as a default
            $.cookie("zipcode", zip, { expires: 7 });
            
            return false;
        }

        //Empty and get ready for a new submission
        $(".error").hide();

        //Display Weather 
        $(".city").html(data.query.results.channel.location.city + ", ");
        $(".state").html(data.query.results.channel.location.region).fadeIn('10000');
        $("#date").html(data.query.results.channel.item.condition.date).fadeIn('10000');
        $("#temp").html('<span class="label label-default">' + data.query.results.channel.item.condition.temp + '&deg;</span>').fadeIn('10000');
        $("#text").html(data.query.results.channel.item.condition.text).fadeIn('10000');
        $("#condition").html('<img class="forecast-img-main" src="images/forecast/' + data.query.results.channel.item.condition.code + '.png">').fadeIn('10000');


        //Display 5 day Forecast
        for (var i = 0; i < 5; i++) {
            item = data.query.results.channel.item.forecast[i];

            $("#forecastday" + [i]).html('<h1>' + item.day + '</h1>');
            $("#forecastdate" + [i]).html(item.date);
            $("#forecasthigh" + [i]).html('<span class="badge">H ' + item.high + "&deg;</span>");
            $("#forecastlow" + [i]).html('<span class="badge">L ' + item.low + "&deg;</span>");
            $("#forecasttext" + [i]).html(item.text);
            $("#forecastcode" + [i]).html('<img class="forecast-img" src="images/forecast/' + item.code + '.png">');
        }
    });

} // End Function


//Display error message if the zipcode is wrong or if the return array is empty.
function processError() {


    //Display Error
    $("#system-error").html('<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Hmm.. that location doesn\'t exsit! Try entering in a new zip code from a valid location.</div>').delay(5000).fadeOut('slow');

    //Set a default zipcode
    var zip = "02138";

    //Return and display Default zip code with a user error message.
    displayWeather(zip);

} //End of function