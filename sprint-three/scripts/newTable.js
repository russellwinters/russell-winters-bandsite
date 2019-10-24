//Going to try to make a table then fill it using data from API

// Create function that takes in one array as a parameter and outputs the whole table.
//! Variable for queryselector
//! create large div for the entire table
//!for loop that:
//! creates rowDiv,
//!contentDiv,
//!and spans,
//!then populates each with a textNode. Fill text not with appropriate content.

function createTable(arr) {
  let container = document.querySelector(".show-table-two");
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
    dateStamp.classList.add(".table-container__row-dates--stamp");
    showDates.appendChild(dateStamp);
    let dateValue = document.createElement("span");
    dateValue.classList.add("table-container__row-dates--value");
    showDates.appendChild(dateValue);

    //Populate row with venue div
    let showVenue = document.createElement("div");
    showVenue.classList.add("table-container__row-venue");
    tableRow.appendChild(showVenue);
    //Spans for content about venues
    let venueStamp = document.createElement("span");
    venueStamp.classList.add("table-container__row-venue--stamp");
    showVenue.appendChild(venueStamp);
    let venueValue = document.createElement("span");
    venueValue.classList.add("table-container__row-venue--value");
    showVenue.appendChild(venueValue);

    //Populate row with location div
    let showLocation = document.createElement("div");
    showLocation.classList.add("table-container__row-location");
    tableRow.appendChild(showLocation);
    //spans for content about locations
    let locationStamp = document.createElement("span");
    locationStamp.classList.add("table-container__row-location--stamp");
    showLocation.appendChild(locationStamp);
    let locationValue = document.createElement("span");
    locationValue.classList.add("table-container__row-location--value");
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
    let venueValueText = document.createTextNode(arr[i]["venue"]);
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
  }
}

let myArr = [
  {
    date: "today",
    venue: "Terminal 5",
    location: "NYC"
  },
  {
    date: "today",
    venue: "Terminal 5",
    location: "NYC"
  },
  {
    date: "today",
    venue: "Terminal 5",
    location: "NYC"
  },
  {
    date: "today",
    venue: "Terminal 5",
    location: "NYC"
  }
];

createTable(myArr);
