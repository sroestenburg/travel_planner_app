const iconPath = 'https://www.weatherbit.io/static/img/icons/'; 

function isLocationValid(inputLocation) {
    return inputLocation != null && inputLocation.trim() != '';
}

function isDateInputValid(inputDate) {
    console.log(inputDate);
    return inputDate != null && inputDate != '';
}

function search(event) {
    event.preventDefault()
    errorMsg.innerHTML = ''
    let location = document.getElementById('location');
    let departureDate = document.getElementById('departure');
    let returnDate= document.getElementById('return')
    console.log(departureDate.value);
    if (!isLocationValid(location.value) || !isDateInputValid(departureDate.value) || !isDateInputValid(returnDate.value) ) {
         displayErrorMsg();
         return;
    }

    function displayErrorMsg() {
       let message = "<p>Please fill out location and/or select dates</p>"
       let errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = message;
    };

    showMyTrip();

    let input = {
        location: location.value,
        departureDate: departureDate.value,
        returnDate: returnDate.value  
    }

    const day_start = new Date(input.departureDate);
    const day_end = new Date(input.returnDate);
    input.total_days = (day_end - day_start) / (1000 * 60 * 60 * 24);

    postData('/weatherData', input, displayWeatherData)

    let pixaData = { location: location.value }
    postData('/pixabay', input, displayPixaBay)
};

// postData is going to be used to post any data to the server

async function postData(endPoint, data, callback) {

    const response = await fetch('http://localhost:8081' + endPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const responseData = await response.json();
        callback(responseData, data)
    } catch (error) {
        console.log(data)
        console.log("error at " + endPoint, error);
    }
}
function showMyTrip() {
    console.log("working")
    document.getElementById("currentTrip").style.display = 'block';
}

function displayWeatherData(data, input) {
    console.log(data);
    
    document.getElementById("city").innerHTML = `<h2> My ${Math.round(input.total_days)} day trip to:${data.data[0].city_name}, ${data.data[0].country_code}</h2>`
    document.getElementById("dDate").innerHTML = `<p> Departure: ${input.departureDate}</p>`;
    document.getElementById("rDate").innerHTML = `<p> Return: ${input.returnDate}</p>`;
    document.getElementById("temp").innerHTML = `<img src="${iconPath}${data.data[0].weather.icon}.png"></img><p>${Math.floor(data.data[0].temp)} &#8451</p>`;
    document.getElementById("description").innerHTML = `<p> ${data.data[0].weather.description}, feels like: ${Math.floor(data.data[0].app_temp)} &#8451 </p>`
  
}

function displayPixaBay(data, input) {
    console.log(data)
    
    if (data.hits.length>=2) {
        document.getElementById("image").innerHTML = `<img class="imageSize" src="${data.hits[1].webformatURL}"></img>`;
        input.previewURL = data.hits[0].previewURL;
    }
    else if (data.hits.length>0) {
        document.getElementById("image").innerHTML = `<img src="${data.hits[0].webformatURL}"></img>`;
        input.previewURL = data.hits[0].previewURL;
    }
    saveTempTrip(input);
}

function saveTempTrip(myTrip){
    localStorage.setItem("tempTrip", JSON.stringify(myTrip));
}

function getSavedTrips() {
    let savedTrips = localStorage.getItem("savedTrips");
    if (savedTrips != null){
        savedTrips = JSON.parse(savedTrips);
    }
    else {
        savedTrips = [];
    }
    return savedTrips;
}

//document.getElementById('saveTrip').addEventListener('click', saveMyTrip);

function saveMyTrip() {
    let myTrip = localStorage.getItem("tempTrip")
    myTrip = JSON.parse(myTrip);
    
    let mySavedTrips = getSavedTrips();
    mySavedTrips.push(myTrip);
    localStorage.setItem("savedTrips", JSON.stringify(mySavedTrips));
    displaySavedTrips();
 
}

function displaySavedTrips() {
    let mySavedTrips = getSavedTrips();
    console.log(mySavedTrips);
    let content = "";
    for(var i=0; i < mySavedTrips.length; i++){
        content += `<div class="savedTripCard">
        <div class="savedTripCardContentLeft">
            <div id="photo"><img src="${mySavedTrips[i].previewURL}"</src></div>
        </div>
        <div class="savedTripCardContentRight">
            <div id="destination"><h3> My ${mySavedTrips[i].total_days} day trip to: ${mySavedTrips[i].location}</h3></div>
            <div class="tripDateInfo">
                <div id="departing"><p> Departure: ${mySavedTrips[i].departureDate}</p></div>
                <div id="returning"><p> Return: ${mySavedTrips[i].returnDate}</p></div>
            </div>
        </div>
    </div>`
    }

    let myTrips = document.getElementById("savedTripCardContainer");
    if (myTrips != null){
        myTrips.innerHTML = content;
    }    
}

displaySavedTrips();

export { search, isLocationValid, saveMyTrip};

