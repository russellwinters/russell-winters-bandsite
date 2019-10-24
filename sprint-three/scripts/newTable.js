//API Project key
const showKey =
  "https://project-1-api.herokuapp.com/showdates?api_key=9a717c8f-9d92-47f2-a204-ee2b162ac82a";

// Create function that takes in one array as a parameter and outputs the whole table.

function createTable(arr) {
  // let container = document.querySelector(".show-table-two");
  let container = document.querySelector(".shows__table");
  let tableDiv = document.createElement("div");
  tableDiv.classList.add("table-container");
  container.appendChild(tableDiv);

  //For loop that does the following on every iterance of the array.
  for (i = 0; i < arr.length; i++) {
    //Have large div for whole table. Need row next
    let tableRow = document.createElement("div");
    tableRow.classList.add("table-container__row");
    tableDiv.appendChild(tableRow);

    //Now I have row, need to populate with dates div
    let showDates = document.createElement("div");
    showDates.classList.add("table-container__row-dates");
    tableRow.appendChild(showDates);
    //In dates div create spans that will hold the content
    let dateStamp = document.createElement("span");
    dateStamp.classList.add("table-container__row-dates-stamp");
    showDates.appendChild(dateStamp);
    let dateValue = document.createElement("span");
    dateValue.classList.add("table-container__row-dates-value");
    showDates.appendChild(dateValue);

    //Populate row with venue div
    let showVenue = document.createElement("div");
    showVenue.classList.add("table-container__row-venue");
    tableRow.appendChild(showVenue);
    //Spans for content about venues
    let venueStamp = document.createElement("span");
    venueStamp.classList.add("table-container__row-venue-stamp");
    showVenue.appendChild(venueStamp);
    let venueValue = document.createElement("span");
    venueValue.classList.add("table-container__row-venue-value");
    showVenue.appendChild(venueValue);

    //Populate row with location div
    let showLocation = document.createElement("div");
    showLocation.classList.add("table-container__row-location");
    tableRow.appendChild(showLocation);
    //spans for content about locations
    let locationStamp = document.createElement("span");
    locationStamp.classList.add("table-container__row-location-stamp");
    showLocation.appendChild(locationStamp);
    let locationValue = document.createElement("span");
    locationValue.classList.add("table-container__row-location-value");
    showLocation.appendChild(locationValue);

    //add button to row.
    let buyTickets = document.createElement("div");
    buyTickets.classList.add("table-container__row-button");
    tableRow.appendChild(buyTickets);
    let ticketLink = document.createElement("a");
    ticketLink.classList.add("table-container__row-button-value");
    buyTickets.appendChild(ticketLink);

    //create Text node for each input
    let dateStampText = document.createTextNode("Dates");
    let dateValueText = document.createTextNode(arr[i]["date"]);
    let venueStampText = document.createTextNode("Venue");
    let venueValueText = document.createTextNode(arr[i]["place"]);
    let locationStampText = document.createTextNode("Location");
    let locationValueText = document.createTextNode(arr[i]["location"]);
    let buttonText = document.createTextNode("Buy Tickets");
    //append text nodes where needed
    dateStamp.appendChild(dateStampText);
    venueStamp.appendChild(venueStampText);
    locationStamp.appendChild(locationStampText);
    dateValue.appendChild(dateValueText);
    venueValue.appendChild(venueValueText);
    locationValue.appendChild(locationValueText);
    ticketLink.appendChild(buttonText);
  }
}

//Axios to get showdates dataand call the function within
const theShowDates = axios
  .get(
    "https://project-1-api.herokuapp.com/showdates?api_key=9a717c8f-9d92-47f2-a204-ee2b162ac82a"
  )
  .then(response => createTable(response.data));
