import { NULL } from "node-sass";

const iconPath = 'https://www.weatherbit.io/static/img/icons/'; 

// function isLocationValid(inputLocation) {
//     return inputLocation != null && inputLocation.trim() != '';
// }

// function isDateInputValid(inputDate) {
//     console.log(inputDate);
//     return inputDate != null;
// }

function search(event) {
    event.preventDefault()
    errorMsg.innerHTML = ''
    let location = document.getElementById('location');
    let departureDate = document.getElementById('departure');
    let returnDate= document.getElementById('return')

    // if (!isLocationValid(location.value) || !isDateInputValid(departureDate.value)) {
    //     alert("Review your request");
    //     return;
    // }
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
    postData('/pixabay', pixaData, displayPixaBay)
};



function displayErrorMsg() {
    let message = "<p>Couldn't find location</p>"
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = message;
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
// Event listener to add function to existing HTML DOM element
document.getElementById('removeTrip').addEventListener('click', hideMyTrip);

/* Function called by event listener */
function hideMyTrip() {
    document.getElementById("currentTrip").style.display = 'none';
}


function displayWeatherData(data, input) {
    console.log(data);

    document.getElementById("city").innerHTML = `<h2> My ${Math.round(input.total_days)} day trip to:${data.data[0].city_name}, ${data.data[0].country_code}</h2>`
    document.getElementById("dDate").innerHTML = `<p> Departure: ${input.departureDate}</p>`;
    document.getElementById("rDate").innerHTML = `<p> Return: ${input.returnDate}</p>`;
    document.getElementById("temp").innerHTML = `<img src="${iconPath}${data.data[0].weather.icon}.png"></img><p>${Math.floor(data.data[0].temp)} &#8451</p>`;
    document.getElementById("description").innerHTML = `<p> ${data.data[0].weather.description}, feels like: ${Math.floor(data.data[0].app_temp)} &#8451 </p>`
    //location.value = '';
    //departureDate.value = '';
    //returnDate.value = '';
    
}

function displayPixaBay(data) {
    console.log(data)
    if (data.hits.length>=2) {
        document.getElementById("image").innerHTML = `<img class="imageSize" src="${data.hits[1].webformatURL}"></img>`;
    }
    else if (data.hits.length>0) {
        document.getElementById("image").innerHTML = `<img src="${data.hits[0].webformatURL}"></img>`;
    }
    else {

    }
}

export { search };

