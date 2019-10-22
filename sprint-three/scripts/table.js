const projectKey = axios
  .get("https://project-1-api.herokuapp.com/register")
  .then(resp => console.log(resp));
const apiKey = "9a717c8f-9d92-47f2-a204-ee2b162ac82a";

// !Object that contains all show information
const shows = [
  {
    dates: "Mon Dec 17 2018",
    venue: "Ronald Lane",
    location: "San Fransisco, CA"
  },
  {
    dates: "Tue Jul 18 2019",
    venue: "Pier 3 East",
    location: "San Fransisco, CA"
  },
  {
    dates: "Fri Jul 22 2019",
    venue: "View Lounge",
    location: "San Fransisco, CA"
  },
  {
    dates: "Wed Aug 11 2019",
    venue: "Pres Club",
    location: "San Fransisco, CA"
  },
  {
    dates: "Sat Aug 12 2019",
    venue: "Hyatt Agency",
    location: "San Fransisco, CA"
  },
  {
    dates: "Fri Sep 05 2019",
    venue: "Moscow Center",
    location: "San Fransisco, CA"
  }
];

// !Create a function for the table headers - Pretty sure this is similar to the one from class, but has it's differences.

function createTableHeading(thisTable, keyValues) {
  let tHead = thisTable.createTHead();
  let tableRow = tHead.insertRow();
  for (showKey of showKeys) {
    let th = document.createElement("th");
    let createText = document.createTextNode(showKey);
    th.appendChild(createText);
    tableRow.appendChild(th);
  }
}

// !Function to create table data - Same as function above. Mostly similar, but I added the button Cell to these rows.
function createTable(thisTable, obj) {
  for (var show of shows) {
    let tableRow = thisTable.insertRow();
    tableRow.className = "show-table__row";
    for (var key in show) {
      let cell = tableRow.insertCell();
      cell.className = "table-cell";
      let createText = document.createTextNode(show[key]);
      cell.appendChild(createText);
    }
    let btnCell = tableRow.insertCell();
    btnCell.className = "button-container";
    let btn = document.createElement("a");
    btn.innerHTML = "Buy tickets";
    btnCell.appendChild(btn);
  }
}

// !Create Mobile table This table was for the mobile version with a different layout. Just made it so that each object was fully displayed in one row, that I would then flex.
function mobileTable(table, obj, keyValue) {
  for (show of shows) {
    let tHead = table.createTHead();
    let tableRow = table.insertRow();
    tableRow.className = "table-row";
    for (key of keyValue) {
      let cell = tableRow.insertCell();
      cell.className = "key-cell";
      let keyText = document.createTextNode(key);
      let cellText = document.createTextNode(show[key]);
      cell.appendChild(keyText);
      let dataCell = tableRow.insertCell();
      dataCell.className = "data-cell";
      dataCell.appendChild(cellText);
    }
    let btnCell = tableRow.insertCell(); //!Button creation for each row. I suppose I could have made a function to do this just once, then invoke it inside this function and the above one.
    btnCell.className = "button-container";
    let btn = document.createElement("a");
    btn.innerHTML = "Buy tickets";
    btnCell.appendChild(btn);
  }
}

// !Declaring variables

const myTable = document.querySelector("table");
const showKeys = Object.keys(shows[0]);
const tabletWidth = window.innerWidth;

var theNewShows = [];
const theShowTable = axios
  .get("https://project-1-api.herokuapp.com/showdates?api_key=" + apiKey)
  .then(response => {
    theNewShows = response.data;
  });
console.log(theNewShows);

// !Invoke functions inside an if statement that determines which table is placed, depending on the viewport
if (tabletWidth >= 768) {
  createTable(myTable, shows);
  createTableHeading(myTable, showKeys);
}

if (tabletWidth < 768) {
  mobileTable(myTable, shows, showKeys);
}
