// Definování funkce, co se má provést po kliknutí na tlačítko.
function getWeatherInfo(){
	// Získání informací o počasí.
	console.log("Getting weather information!");
	var theInputBox = document.getElementById('query');
	var theInputValue = theInputBox.value;
	console.log(theInputValue);

	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
	var apiID = "&APPID=YOUR-APP-ID";
	var searchURL = weatherURL + theInputValue + appID;

	$.getJSON(searchURL,
			function(data){
				console.log(data);
				var theTemperature = "???";
				if (data.cod === '404'){
					alert("Oh ne. Zkuste to znovu.");
					return;
				}
				console.log(data.main.temp);
				theTemperature = data.main.temp;
				var theResult = document.getElementById('weatherResults');
				theResult.innerHTML = "Teplota " + theInputValue + " je " + theTemperature;
			}
	);
}

// Tlačítko
var theButton = document.getElementById('search');

// Událost k tlačítku
theButton.onclick = getWeatherInfo;

