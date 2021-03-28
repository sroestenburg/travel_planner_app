// Event listener to add function to existing HTML DOM element
document.getElementById('removeTrip').addEventListener('click', hideMyTrip);

/* Function called by event listener */
function hideMyTrip() {
    document.getElementById("currentTrip").style.display = 'none';
}

export { hideMyTrip };
