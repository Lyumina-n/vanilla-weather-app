function formatDate(timestamp){
let date=new Date(timestamp);
let days=[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
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

function displayTemperature(response){
    console.log(response.data);
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
}

let apiKey="3t24b911d0709b8ae0o92f53fd6c2444";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=Casablanca&key=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);