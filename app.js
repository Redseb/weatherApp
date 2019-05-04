// Tutorial: https://www.youtube.com/watch?v=wPElVpR1rwA
// Some things have been altered

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/f738853fde6a67eda2bbb8846213a2ab/${lat},${long}`; //lat, long

            fetch(api) //Make call
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon} = data.currently;
                    //FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set DOM elements to API
                    temperatureDegree.textContent = Math.floor(celsius);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Fahrenheit
                    temperatureSection.addEventListener('click', () => { degreeToggle(temperature, celsius); });
                })
        });
    }

/* 
    Responsible for setting the icon to an animated Skycon.

    Accepts icon string from Darksky API ie. (partly-cloudy-day)
    Converts icon string to Skycon format ie. (PARTLY_CLOUDY_DAY)
    Initiates icon animation
*/
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //Replace - with _, uppercase for Skycons library
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
/* 
    Reponsible for toggling the degree (C or F) and calculating new values

    Gets passed the temperature in fahrenheit and celsius
*/

    function degreeToggle(temperature, celsius){
        if(temperatureSpan.textContent === 'F'){
            //Convert to celsius
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = Math.floor(celsius);
        } else {
            //Convert to fahrenheit
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = Math.floor(temperature);
        }
    }
});