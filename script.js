var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=9af9987d0f66079a5baa5b00f7f58162';

function createHTML(cityName, tempValue){
	var bgClass;
	if (tempValue <= 30){
		bgClass = 'blueBg';
	}
	else if (tempValue >= 40 && tempValue <= 50){
		bgClass = 'redBg';
	}
	else if (tempValue > 50 && tempValue <= 60){
		bgClass = 'greenBg';
	}
	else if (tempValue > 60 && tempValue <= 70){
		bgClass = 'orangeBg';
	}
	else if (tempValue > 70 && tempValue <= 80){
		bgClass = 'yellowBg';
	}
	else if (tempValue > 80 && tempValue <= 90){
		bgClass = 'pinkBg';
	}
	else if (tempValue > 90 && tempValue <= 100){
	bgClass = 'purplekBg';
	}
	else{
		bgClass = 'grayBg';
	}

	

	
	var htmlString =	'<div class="setBorder ' + bgClass + '">' +
											'<div class="CityName">' + cityName + '</div>' +
											'<div class="WeatherC">' + Math.ceil(((tempValue - 32) / (1.8))) +"°C " +'</div>' +
											'<div class="WeatherTemp">' + tempValue + "°F" +'</div>' +
										
										'</div>';
	$('#weatherResults').prepend(htmlString);
}

var searchWeather = function(city){

	var searchURL = weatherBaseURL + city + weatherQueryParams;
	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Něco se pokaziolo.");
			console.log(data.status);
			alert("Zkuste to znovu.");
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);
			if (data.cod === '404'){
				alert("Něco se pokazilo. Zkuste to znovu.");
				return;
			}

			$("#query").val('');

			var theCity = data.name || '????';
			var theTemp = Math.round(data.main.temp) || 70;

			createHTML(theCity, theTemp);
		}
	});
};

$(document).ready(function(){
	console.log("LOADED!!!!");

	$("#search").on('click', function(){
		console.log("Clicked search");
		var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
		searchWeather(newSearchTerm);
		$("#search").blur();
	});


	$('#query').on('keypress', function(e){
		if (e.which == 13){
			$("#search").trigger('click');
		}
	});
});
