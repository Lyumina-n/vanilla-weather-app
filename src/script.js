function formatDate(timestamp){
let date=new Date(timestamp);
let days=["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day=days[date.getDay()];
let hours=date.getHours();
if(hours<10){
    hours=`0${hours}`;
};
let minutes=date.getMinutes();
if(minutes<10){
    minutes=`0${minutes}`;
};
return`${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
let date=new Date(timestamp*1000);
let day=date.getDay();
let days=[ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
return days[day];

}

function displayForecast(response) {
    let forecast=response.data.daily;
    console.log(response.data.daily);
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML=`<div class="row">`;
    let days=[
       "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    forecast.forEach(function(forecastDay, index){
        if (index>0){
        forecastHTML = 
    forecastHTML+
    `    <div class="col-2" >
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="50"/>
        <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}°C</span>
       <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}°C</span>
    </div>
    </div>
`;   
        }     
    });
forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;

}
function getForecast(coordinates){
    console.log(coordinates);
    let apiKey="3t24b911d0709b8ae0o92f53fd6c2444";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
    
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.temperature.current);
let cityElement=document.querySelector("#city");
cityElement.innerHTML=response.data.city;
let descriptionElement=document.querySelector("#description");
descriptionElement.innerHTML=response.data.condition.description;
let windElement=document.querySelector("#wind");
windElement.innerHTML=Math.round(response.data.wind.speed);
let humidityElement=document.querySelector("#humidity");
humidityElement.innerHTML=response.data.temperature.humidity;
let dateElement=document.querySelector("#date");
dateElement.innerHTML=formatDate(response.data.time*1000);
let iconElement=document.querySelector("#icon");
iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
iconElement.setAttribute("alt", response.data.condition.description);
celsiusTemperature=response.data.temperature.current;
console.log(response.data);
getForecast(response.data.coordinates);
}
function search(city){
let apiKey="3t24b911d0709b8ae0o92f53fd6c2444";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}
function disaplayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function disaplayCelsiusTemperature(event){
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");

    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", disaplayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", disaplayCelsiusTemperature);

search("Kherson");