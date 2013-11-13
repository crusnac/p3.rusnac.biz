
//Set the zip code variable to be that will be used as part of the QUERY
$(document).ready(function(){
	
	$(".error").hide();
	
	//Check to see if a zip code has been set, if not set a default to display some weather
	if (zip === undefined) {
		var zip = "97045";
		displayWeather(zip);
	}

	//Pass the input as a variable.
	$("#weatherSubmit").click(function(){
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
	
	
	
				
				
		$.getJSON(query, function(data){
				
				//Check to make sure zipcode is valid based upon 
				if ("City not found" === data.query.results.channel.item.title) {
					cityNotFound();
				}
								
				//Empty and get ready for a new submission
				$(".empty").empty();
				$(".error").hide();

				//Display Weather 
				$(".city").append(data.query.results.channel.location.city+ ", ");
				$(".state").append(data.query.results.channel.location.region);
				$("#date").append(data.query.results.channel.item.condition.date);
				$("#temp").append('<span class="label label-default">'+data.query.results.channel.item.condition.temp+'&deg;</span>');
				$("#text").append(data.query.results.channel.item.condition.text);
				$("#condition").append('<img class="forecast-img" src="images/forecast/'+data.query.results.channel.item.condition.code+'.png">');


				//Display 5 day Forecast
				for (var i=0;i<5;i++){
                    item = data.query.results.channel.item.forecast[i];
                    
                    	$("#forecastday"+[i]).append('<h1>'+item.day+'</h1>');
                    	$("#forecastdate"+[i]).append(item.date);
						$("#forecasthigh"+[i]).append('<span class="badge">'+item.high+"&deg;</span>");
						$("#forecastlow"+[i]).append('<span class="badge">'+item.low+"&deg;</span>");
						$("#forecasttext"+[i]).append(item.text);
						$("#forecastcode"+[i]).append('<img class="forecast-img" src="images/forecast/'+item.code+'.png">');
                }
			});
			
		}// End Function
		

function cityNotFound(){

	$(".error").show();
	displayWeather(zip);
		
}//End of function		
