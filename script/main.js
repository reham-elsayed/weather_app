// console.log(new Date().toString()); 
// console.log("hello")
const today = document.getElementById("col");
var weatherData= [];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const forcast = document.getElementById("col-forcast")
let dateObject = new Date();
console.log(dateObject.toString());
const hourly = document.getElementById("hourly");
var country = document.getElementById("search");
const main = document.getElementById("main");
const btn =document.querySelector(".btn");

let long, lat;

if (navigator.geolocation){ 
    navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos.coords.latitude)
        console.log(pos.coords.longitude)
long = pos.coords.longitude
lat = pos.coords.latitude
    })
}




/**
 * attach eventlistener to input field and calls detData to call api and get the data of input country
 * then calls the display function and pass the returned data to it
 */
let countryValue = country.value?country.value:lat +"," +long;
console.log(countryValue)
btn.addEventListener('click', async function(e){
    e.preventDefault();
    console.log("e.target.value",e.value); // Debugging line

    try {
        let s = await detData();
        display(s);

        let f = await forcastData();
        displayForcast(f);

        let h = await hourlyData();
        displayHourly(h);
    } catch (error) {
        console.error("An error occurred:", error);}
})


// country.addEventListener('input', async function(){
//     let s=await detData()
//     display(s)
//     let f= await forcastData()
//     displayForcast(f)

//     let h= await hourlyData()
//     displayHourly(h)
// })

async function detData(){
    const currentLocation = `${long},${lat}`
    console.log(currentLocation) 
    try{
        
console.log(countryValue)
        var data = await fetch(`https://api.weatherapi.com/v1/current.json?key=b157d94d582f4efea61125650240506&q=${country.value?country.value:currentLocation}&aqi=no`);
        var parseData = await data.json();
        console.log(parseData)
        weatherData= parseData
        return  weatherData;
      

    }catch(error){

        console.log(error);
        return error;
    }

}

window.onload=async function(){
   let s=await detData()
    display(s)
    let f= await forcastData()
    displayForcast(f)

    let h= await hourlyData()
    displayHourly(h)
}

function display(data){
    console.log("Display function called with:", data); // Debug log
let time = new Date(data.location.localtime);
const moon = document.getElementById("moon");

console.log(time)

  
   let wind = ''
switch(data.current.wind_dir){
     case 'N':
        wind = "North"
        break;
    case 'NE':
        wind = "NorthEast";
        break;
     case 'NW':
            wind = "NorthWest";
            break;
    case 'S':
                wind = "south";
                break;
 case 'S':
wind = "south";
break;
case 'SE':
wind = "southEast";
break;
case 'SW':
wind = "southWest";
break;
case 'E':
wind = "East";
break;
case 'W':
wind = "West";
break;
   }  
    today.innerHTML= ` 
    <div class=" d-flex flex-column justify-content-between ${data.current.is_day?'sunny':'nighty'}  rounded-3 h-100 ">
     <div class=" d-flex justify-content-between align-items-center card p-1">
     <p class=""> ${time.getDate()} ${month[time.getMonth()]} ${time.getFullYear()}</p>
    <p class=" ">${daysOfWeek[time.getDay()]} </p>
    </div>
    <!--<div class="d-flex flex-column  p-1 max">-->
      <p class="p-2 fs-3">${data.location.name}</p>
      <div class="d-flex justify-content-center ">
      <h2 class="pe-5 fs-1" >${data.current.temp_c} C</h2>
      <i id="moon" class="fa fa-moon ${data.current.is_day?'d-block':'d-none'} fs-3"></i>
       <i id="moon" class="fa fa-sun ${data.current.is_day?'d-none':'d-block'} fs-3"></i>
      </div>
      
      <p class="p-2 fs-3">${data.current.condition.text}</p>

    <!--</div>-->
    <div class="d-flex justify-content-between p-1 caard ">
  <span> <i class="fa fa-umbrella"></i> ${data.current.cloud}%</span>
  <span><i class="fa fa-wind"></i>${data.current.wind_kph}km/hr</span>
  <span><i class="fa fa-bullseye"></i> ${wind}
  </span>
    </div>
    
    </div>
    
`
}




//   free weather and geo data via a JSON/XML restful API.
//  b157d94d582f4efea61125650240506

async function forcastData(){
     const currentLocation = `${long},${lat}`
    try{
       
console.log(countryValue)
        var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b157d94d582f4efea61125650240506&q=${country.value?country.value:currentLocation}&aqi=no&days=3`);
        var parseData = await data.json();
        console.log(parseData)
       let forcastData= parseData;
     
        return  forcastData;
      

    }catch(error){

        console.log(error);
        return error;
    }

}
function displayForcast(forcData){
console.log(forcData);
let forcastArray = forcData['forecast']['forecastday']
console.log( forcastArray)
console.log(today)

let cartoona = ''
for (let i = 0; i< forcastArray.length; i++){
    let time = new Date(forcastArray[i].date)
   console.log(daysOfWeek[time.getDay()]) ;
   cartoona += `<div class=" d-flex flex-column col-md-4 card g-2 p-3 ag-courses_item">
    <div class="ag-courses-item_bg"></div>
   <div class="text-white">
   ${daysOfWeek[time.getDay()]}
     </div>
<div>
 <div class="d-flex flex-column  ">
      <p>sunrise at: ${forcastArray[i].astro.sunrise}</p>
      <p>sunset at: ${forcastArray[i].astro.sunset}</p>
      <div class="d-flex justify-content-evenly ">
      <h2 >${forcastArray[i].day.avgtemp_c} C</h2>
      
      </div>
      <div class="d-flex">
       <p class="d-inline">${forcastArray[i].day.condition.text}</p>
       <span class="icon"> <img src="${forcastArray[i].day.condition.icon}" alt="" class="w-100"></span>
      </div>
     

    </div>
    <div class="font d-md-flex flex-md-row justify-content-between flex-column ">
  <div> <i class="fa fa-umbrella"></i> ${forcastArray[i].day.daily_will_it_rain}</div>
  <div><i class="fa fa-wind"></i>${forcastArray[i].day.maxwind_mph}km/hr</div>
  <div><i class="fa fa-bullseye"></i> ${forcastArray[i].day.avghumidity}
  </div>
    </div>
</div>
   </div>`
}
forcast.innerHTML =cartoona;
}
   


async function hourlyData(){
    try{
        const currentLocation = `${long},${lat}`
console.log(countryValue)
        var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b157d94d582f4efea61125650240506&q=${country.value?country.value:currentLocation}&aqi=no&hour_fields=temp_c,wind_mph`);
        var parseData = await data.json();
        return  parseData;
      

    }catch(error){

        console.log(error);
        return error;
    }

}

function displayHourly(data){
    
    console.log(data.forecast.forecastday[0].hour[0]);
    console.log(data.forecast.forecastday[0].hour[1]);
  
    for (let i = 0; i< data.forecast.forecastday[0].hour.length; i++){

       
        // var ampm= data.forecast.forecastday[0].hour[i].is_day? 'AM': "PM"
        const obj = data.forecast.forecastday[0].hour[i]

        let now = new Date(data.forecast.forecastday[0].hour[i].time)
        let time = formatTime12Hour(now)
       
        hourly.innerHTML += `<tr class=" ${obj.is_day?'sunny':'nighty'} ">
        <td>${daysOfWeek[now.getDay()]} ${time}  </td>
        <td>${obj.temp_c} C</td>
        <td> ${obj.condition.text} </td>
        </tr>`
        }
    }
    function formatTime12Hour(date) {
        let formatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    
        return formatter.format(date);
    }