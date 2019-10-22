const projectKey = axios
  .get("https://project-1-api.herokuapp.com/register")
  .then(resp => console.log(resp));
const apiKey = "9a717c8f-9d92-47f2-a204-ee2b162ac82a";
const projectURL =
  "https://project-1-api.herokuapp.com/comments?api_key=9a717c8f-9d92-47f2-a204-ee2b162ac82a"; //tried to make this URL based off of the code Along but it's not working. Also tried it without the API Key

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
console.log(today);

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

  //! unshift() object into array
  theGivenComments.unshift(newComment); //Now when I submit a new comment I get my original array because of this, but if I switch array names this doesn't work.
  //! Was thinking of making the function pop() last object from the array for the sake of storage and memory, but I figured saving the data would probably be best
  //! run for loop to update comment section by updating the nodeValue from the particular nodes that are being referenced from tags[].
  for (i = 0; i < 3; i++) {
    tags[i].name.nodeValue = theGivenComments[i]["name"];
    tags[i].comment.nodeValue = theGivenComments[i]["comment"];
    tags[i].timestamp.nodeValue = epochTimeFunction(
      theGivenComments[i]["timestamp"]
    ); //This is me trying to output date from epoch time. Success!!
  }

  // axios({
  //   method: "post",
  //   url: "projectURL",
  //   data: newComment,
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8"
  //   }
  // }).then(response => console.log(response.data)); //Attempting to make the post, but I'm getting the good ol' error 405 - method not allowed
  // //todo: remake the commented code above
  // axios({
  //   method: "post",
  //   url: projectURL,
  //   data: newComment
  // }).then(response => {
  //   for (i = response.length; i > response.length - 3; i--) {
  //     tags[i].name.nodeValue.theGivenComments[i]["name"];
  //     tags[i].comment.nodeValue.theGivenComments[i]["comment"];
  //     tags[i].timestamp.nodeValue.theGivenComments[i]["timestamp"];
  //   }
  // console.log(response);
  // });

  console.log(theGivenComments);
  //! Reset the form so it's fresh after submission.
  form.reset();
});