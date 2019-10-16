// !Object that contains all show information
var shows = [
  {
    Dates: "Mon Dec 17 2018",
    Venue: "Ronald Lane",
    Location: "San Fransisco, CA"
  },
  {
    Dates: "Tue Jul 18 2019",
    Venue: "Pier 3 East",
    Location: "San Fransisco, CA"
  },
  {
    Dates: "Fri Jul 22 2019",
    Venue: "View Lounge",
    Location: "San Fransisco, CA"
  },
  {
    Dates: "Wed Aug 11 2019",
    Venue: "Pres Club",
    Location: "San Fransisco, CA"
  },
  {
    Dates: "Sat Aug 12 2019",
    Venue: "Hyatt Agency",
    Location: "San Fransisco, CA"
  },
  {
    Dates: "Fri Sep 05 2019",
    Venue: "Moscow Center",
    Location: "San Fransisco, CA"
  }
];

// !Create variables that will be used in both functions
var tableRow;
var createText;

// !Create a function for the table headers

function createTableHeading(thisTable, keyValues) {
  var tHead = thisTable.createTHead();
  tableRow = tHead.insertRow();
  for (var show of showKeys) {
    var th = document.createElement("th");
    createText = document.createTextNode(show);
    th.appendChild(createText);
    tableRow.appendChild(th);
  }
}

// !Function to create table data
function createTable(thisTable, data) {
  for (var show of shows) {
    tableRow = thisTable.insertRow();
    for (var key in show) {
      var cell = tableRow.insertCell();
      createText = document.createTextNode(show[key]);
      cell.appendChild(createText);
    }
    var btnCell = tableRow.insertCell();
    btnCell.className = "button-container";
    var btn = document.createElement("a");
    btn.innerHTML = "Buy tickets";
    btnCell.appendChild(btn);
  }
}

// !Invoking variables
var myTable = document.querySelector("table");
var showKeys = Object.keys(shows[0]);

// !Invoke functions
createTableHeading(myTable, showKeys);
createTable(myTable, shows);
