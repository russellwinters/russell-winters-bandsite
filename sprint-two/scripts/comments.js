// !Date Function: Unlike the button function on the table I made this up here so I could just invoke it below.
const dateFunction = () => {
  let today = new Date();
  let dateStamp =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  return dateStamp;
};

const today = dateFunction();

// !Array that will help to replace OG comment section
var tags = [];

// !ORIGINAL array variable. Purposefully using var because it will be changed, so no const, and I'm unclear whether let would be more acceptable here ?
var commentArr = [
  {
    name: "J. Cole",
    comment:
      "Woooow that was siiiiiick. Big fan, big fan. 'Bout to put that guy on my next album.",
    timestamp: today
  },
  {
    name: "kiLL Edward",
    comment:
      "ahhhhhh my guuuuuyyyyyy, J. Cole is the friggin man. Me haffi be on that ablum styll.",
    timestamp: today
  },
  {
    name: "The Lumineers",
    comment:
      "How did we even end up on this soundcloud rapper?!? Pretty good, but not our style.",
    timestamp: today
  }
];

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
    let timeOutput = document.createTextNode(arr[objNumber]["timestamp"]);
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
renderComments(thisSection, commentArr);

// //! Purpose of this function: at the event of submission, update array with submitted text and re-render that comment section
var form = document.querySelector("#comments");
form.addEventListener("submit", click => {
  click.preventDefault();
  //! create variables for submitted content
  let commentName = event.target.name.value;
  let commentStatus = event.target.comment.value;
  let newTimeStamp = today;
  //! create object containing each variable with content
  let newComment = {
    name: commentName,
    comment: commentStatus,
    timestamp: newTimeStamp
  };

  //! unshift() object into array
  commentArr.unshift(newComment);
  //! Was thinking of making the function pop() last object from the array for the sake of storage and memory, but I figured saving the data would probably be best
  //! run for loop to update comment section by updating the nodeValue from the particular nodes that are being referenced from tags[].
  for (i = 0; i < 3; i++) {
    tags[i].name.nodeValue = commentArr[i]["name"];
    tags[i].comment.nodeValue = commentArr[i]["comment"];
    tags[i].timestamp.nodeValue = commentArr[i]["timestamp"];
  }

  //! Reset the form so it's fresh after submission.
  form.reset();
});
