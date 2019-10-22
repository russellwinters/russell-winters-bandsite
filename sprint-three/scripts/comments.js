const projectKey = axios
  .get("https://project-1-api.herokuapp.com/register")
  .then(resp => console.log(resp));
const apiKey = "9a717c8f-9d92-47f2-a204-ee2b162ac82a";

// !Date Function: Unlike the button function on the table I made this up here so I could just invoke it below.
const dateFunction = () => {
  //this needs to change so it runs of epoch time.
  //To do so you need a variable for the epoch time, then run that variable through a new Date(variable) to output something that "today" can run.
  let today = new Date();
  let dateStamp =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  return dateStamp;
};
//Function to convert epoch Times - takes epoch time as parameter
function epochTimeFunction(num) {
  let output = new Date(num);
  let dateStamp =
    output.getMonth() + 1 + "/" + output.getDate() + "/" + output.getFullYear();
  return dateStamp;
}

const today = dateFunction();
// console.log(today); //Only used this to check that today function was working 

// !Array that will help to replace OG comment section
var tags = [];

// !Function that will render the first three objects inside our array at the top.
function renderComments(thisSection, arr) {
  for (i = 0; i < 3; i++) {
    let objNumber = i;

    //! create div within section
    let commentContainer = document.createElement("div");
    commentContainer.className = "comment-div";
    thisSection.appendChild(commentContainer);

    //! create div inside previous div with classname of .image-container that can be styled in SCSS
    let imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    commentContainer.appendChild(imageContainer);

    //! create image within this container - I repeated this image in all comments because it's the only one we have access to.
    let newImg = document.createElement("img");
    newImg.setAttribute("src", "./assets/images/Mohan-muruge.jpg");
    imageContainer.appendChild(newImg);

    //! create another div for content with classname .form-content
    let formContent = document.createElement("div");
    formContent.className = "form-content";
    commentContainer.appendChild(formContent);

    //! create div inside previous div for name and timestamp
    let postId = document.createElement("div");
    postId.className = "post-id";
    formContent.appendChild(postId);

    //! Creating spans for both the name and time part of the input.
    let nameStamp = document.createElement("span");
    nameStamp.className = "name-stamp";
    postId.appendChild(nameStamp);
    let timeStamp = document.createElement("span");
    timeStamp.className = "time-stamp";
    postId.appendChild(timeStamp);

    //! creating div for comment, just like the above inputs
    let commentStatus = document.createElement("div");
    commentStatus.className = "comment-output";
    formContent.appendChild(commentStatus);

    //! creating text node for each object value;
    let commentOutput = document.createTextNode(arr[objNumber]["comment"]);
    let nameOutput = document.createTextNode(arr[objNumber]["name"]);
    let timeOutput = document.createTextNode(
      epochTimeFunction(arr[objNumber]["timestamp"])
    ); //Text Node now gives propper date from epoch time!
    nameStamp.appendChild(nameOutput);
    timeStamp.appendChild(timeOutput);
    commentStatus.appendChild(commentOutput);

    // !Creating a new object that contains references for each of the text nodes - so that I can replace their content when form is submitted.
    tags[i] = {
      name: nameOutput,
      comment: commentOutput,
      timestamp: timeOutput
    };
  }
}

// !QuerySelector for the seciton so that I can then invoke the function to render comments on following line
const thisSection = document.querySelector(".comment-display");

//! Render comments from API array
var theGivenComments = [];
const theCommentSection = axios
  .get("https://project-1-api.herokuapp.com/comments?api_key=" + apiKey)
  .then(response => {
    theGivenComments = response.data;
    renderComments(thisSection, theGivenComments);
  });

// //! Purpose of this function: at the event of submission, update array with submitted text and re-render that comment section
var form = document.querySelector("#comments");
form.addEventListener("submit", click => {
  click.preventDefault();
  //! create variables for submitted content
  let commentName = event.target.name.value;
  let commentStatus = event.target.comment.value;
  let newTimeStamp = new Date().getTime(); //Need to request the date in epoch time
  //! create object containing each variable with content
  let newComment = {
    name: commentName,
    comment: commentStatus,
    timestamp: newTimeStamp
  };

//!Following lines to create object to sent to API server and then to actually send it.
let axiosComment = {
  name: commentName,
  comment: commentStatus
};

axios.post("https://project-1-api.herokuapp.com/comments?api_key=b", axiosComment).then(response => console.log(response.data)); //Successfully posting to API

  //! unshift() object into array
  theGivenComments.unshift(newComment); //This is only necesary so that it now updates the comment section.
  //! Was thinking of making the function pop() last object from the array for the sake of storage and memory, but I figured saving the data would probably be best
  //! run for loop to update comment section by updating the nodeValue from the particular nodes that are being referenced from tags[].
  for (i = 0; i < 3; i++) {
    tags[i].name.nodeValue = theGivenComments[i]["name"];
    tags[i].comment.nodeValue = theGivenComments[i]["comment"];
    tags[i].timestamp.nodeValue = epochTimeFunction(
      theGivenComments[i]["timestamp"]
    ); //This is me trying to output date from epoch time. Success!!
  }

  //! Reset the form so it's fresh after submission.
  form.reset();
});
