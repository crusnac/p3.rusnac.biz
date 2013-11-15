
//Set the zip code variable to be that will be used as part of the QUERY
$(document).ready(function(){
	
	//Hide main error div
	$(".error").hide();
	
		
	//Check to see if a zip code has been set, if not set a default to display some weather
	
	if ($.cookie('zipcode')){
		
		var zip = $.cookie('zipcode');
		displayWeather(zip);
		
		}else{
		
		var zip = "02138";
		displayWeather(zip);
		
  }
	
	
	

	//Pass the input as a variable.
	$("#weatherSubmit").click(function(){
		
		//Set main zip variable based upon user input		
		var zip = $('#zipcode').val();
		
		//Update ZipCode Cookie to save state of which zipcode has been entered
		$.cookie("zipcode", zip);

		//Send user input to function 
		displayWeather($('#zipcode').val());
		
		});
	});
	
//Display Weather and 5 day forecast
function displayWeather(zip){


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
		$.getJSON(query, function(data){
		
				//Fade in slowly 
				$(".container").fadeIn("slow");
				
				//Check to make sure zipcode is valid based upon 
				if (("City not found" === data.query.results.channel.item.title) || data === []) {
					processError();
					}
						
				//Empty and get ready for a new submission
				$(".error").hide();
				
				//Display Weather 
				$(".city").html(data.query.results.channel.location.city+ ", ");
				$(".state").html(data.query.results.channel.location.region).fadeIn('10000');
				$("#date").html(data.query.results.channel.item.condition.date).fadeIn('10000');
				$("#temp").html('<span class="label label-default">'+data.query.results.channel.item.condition.temp+'&deg;</span>').fadeIn('10000');
				$("#text").html(data.query.results.channel.item.condition.text).fadeIn('10000');
				$("#condition").html('<img class="forecast-img-main" src="images/forecast/'+data.query.results.channel.item.condition.code+'.png">').fadeIn('10000');


				//Display 5 day Forecast
				for (var i=0;i<5;i++){
                    item = data.query.results.channel.item.forecast[i];
                    
                    	$("#forecastday"+[i]).html('<h1>'+item.day+'</h1>');
                    	$("#forecastdate"+[i]).html(item.date);
						$("#forecasthigh"+[i]).html('<span class="badge">'+item.high+"&deg;</span>");
						$("#forecastlow"+[i]).html('<span class="badge">'+item.low+"&deg;</span>");
						$("#forecasttext"+[i]).html(item.text);
						$("#forecastcode"+[i]).html('<img class="forecast-img" src="images/forecast/'+item.code+'.png">');
                }
			});
			
		}// End Function
		

//Display error message if the zipcode is wrong or if the return array is empty.
function processError(){

	$(".error").show();
	$(".container").fadeOut("slow");

	
	//Return and displauy Default zip code
	displayWeather(zip);
		
}//End of function		

	
