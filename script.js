key = "Past your Weather API KEY here";
//EN //This line declares and initializes a variable key with a string value. The value represents an API key, which is used to authenticate the requests to the OpenWeatherMap API. The API key is necessary to access weather data from the API.

let result = document.getElementById("result");
//EN //This line retrieves the HTML element with the ID "result" and stores it in the variable result. This element will be used to display the weather information retrieved from the API.

let searchBtn = document.getElementById("search-btn");
//EN //This line retrieves the HTML element with the ID "search-btn" and stores it in the variable searchBtn. This element is a button on the webpage, and it will be used to trigger the weather data retrieval when clicked.

let cityRef = document.getElementById("city");
//EN //This line retrieves the HTML element with the ID "city" and stores it in the variable cityRef. This element is an input field on the webpage where the user can enter the name of a city.

cityRef.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getWeather();
  }
});
//EN //we add an event listener to the "cityRef" input field for the "keypress" event, (when we press ENTER after we enter the location)

//EN //Function to fetch weather details from api and display them.
let getWeather = () => {
//EN // This is the 'getWeather' function, which is called when the search button is clicked or when the page loads.
  let cityValue = cityRef.value;
  //EN //This line retrieves the value entered by the user in the 'cityRef' and stores it in the variable 'cityValue'.
       
  
  //<---------------------->
  if (cityValue.length === 0) {
    getLocationWeather();
    //EN //It checks if cityValue is empty. If it is, the getLocationWeather function is called to fetch the weather data based on the user's current location.
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    //EN //If cityValue is not empty, it constructs a URL using the OpenWeatherMap API endpoint, including the city name and the API key. 
    cityRef.value = "";
    fetch(url)
    //EN //The fetch function is used to make a GET request to the URL and retrieve the weather data in JSON format.
      .then((resp) => resp.json())
      .then((data) => { 
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        result.innerHTML = 
        `<h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${Math.round(data.main.temp)} &#176;</h1>`;
        //EN //Here we use Math.round method to round the number from the temperature.
      })
      .catch(() => {
        //EN //The retrieved data is then processed and displayed in the result element. It logs the data to the console and updates the result.innerHTML with the weather information.
        result.innerHTML = `<h3 class="msg">Try one more time, maybe is the lucky one.</h3>`;
      });
  }
};


  //<------------------------------------------------>


//EN //The getLocationWeather function is responsible for retrieving weather data based on the user's current location.
let getLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //EN //This it will check if the navigator.geolocation is supported by the browser, if it is the getCurrentPosition is called to obtain the user's current location by latitude and longitude. 
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
      //EN //The weather data is fetched using the fetch function and processed the same like above in the getWeather function.
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          console.log(data.weather[0].icon);
          console.log(data.weather[0].main);
          console.log(data.weather[0].description);
          console.log(data.name);

          //EN //The results are displayed in the result element.
          result.innerHTML = 
          `<h2>${data.name}</h2>
          <h4 class="weather">${data.weather[0].main}</h4>
          <h4 class="desc">${data.weather[0].description}</h4>
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
          <h1>${Math.round(data.main.temp)} &#176;C</h1>`;
          //EN //we use here Math.round method to round the temperature, so that it will show us without coma.
          
        })
        .catch(() => {
          result.innerHTML = `<h3 class="msg">We are terribly Sorry, something went wrong and we can not find your location!</h3>`;
        });
    });
  } else {
    result.innerHTML = `<h3 class="msg">Your Browser's Geolocation didn't allowed us to see your current location!</h3>`;
  }
};


  //<------------------------------------------------>
searchBtn.addEventListener("click", getWeather);
//EN //This line adds an event listener to the "click" event of the searchBtn element. When the button is clicked, the getWeather function is called to fetch and display the weather information.

window.addEventListener("load", getLocationWeather);
// //EN //Overall, this code fetches weather data from the OpenWeatherMap API based on user input, updates the webpage with the retrieved information, and handles error cases when the city is not found or there is an issue with the API request.

//-----------------------------------------------------------------------

let dateElement = document.getElementById("date");
let timeElement = document.getElementById("time");

//EN //These lines retrieve the HTML elements with the IDs "time" and "date" using document.getElementById(). These elements will be used to display the clock and date information.


let updateClock = () => {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  //EN // This function named updateClock using arrow function syntax. Inside the function, it retrieves the current time using the Date object and assigns the hours, minutes, and seconds to separate variables.

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  //EN //Here we format the time values to ensure they have leading zeros if necessary. If any of the values are less than 10, a leading zero is added by concatenating it with the original value. For example, if the hour is 9, it becomes "09".

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  //EN //This updates the textContent property of the timeElement with the formatted time values. It uses string interpolation to construct a string in the format "hours:minutes:seconds".

  let options = { day: "2-digit", month: "long", year: "numeric" };
  let currentDate = currentTime.toLocaleDateString("en-GB", options);
  //EN //This will transform our date from (MM/DD/YYYY) to (DD/MM/YYYY) and if we want to write the month numeric we have to type (month: "2-digit")


  dateElement.textContent = currentDate;
};
  //EN //The textContent property of the dateElement with the current date.

updateClock();
//EN //This calls the updateClock function immediately to display the initial time and date when the page loads.

setInterval(updateClock, 1000);
//EN //This uses the setInterval function to call the updateClock function every 1000 milliseconds (1 second). This ensures that the clock is updated dynamically, displaying the current time and date every second. 
