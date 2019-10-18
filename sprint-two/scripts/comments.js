// !Need function to convert new Date() to current format. Have that though

// *Date Function:
const dateFunction = () => {
  let today = new Date();
  let dateStamp =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  return dateStamp;
};

// !Testing above
// console.log(dateFunction());
// console.log(commentArr[2]["comment"]);
const today = dateFunction();
// *Array that will be replacing OG comment section
var tags = [];

// !Array Constant
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

    // * create div within section
    let commentContainer = document.createElement("div");
    commentContainer.className = "comment-div";
    thisSection.appendChild(commentContainer);

    //* create div inside previous div with classname.image that can be style
    let imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    commentContainer.appendChild(imageContainer);

    // *create image within this container
    let newImg = document.createElement("img");
    newImg.setAttribute("src", "./assets/images/Mohan-muruge.jpg");
    imageContainer.appendChild(newImg);

    // *  create another div for content with classname .form-content
    let formContent = document.createElement("div");
    formContent.className = "form-content";
    commentContainer.appendChild(formContent);

    // * create div inside previous div for name and timestamp
    let postId = document.createElement("div");
    postId.className = "post-id";
    formContent.appendChild(postId);

    // * input those two into that div -- may need span --
    let nameStamp = document.createElement("span");
    nameStamp.className = "name-stamp";
    postId.appendChild(nameStamp);
    let timeStamp = document.createElement("span");
    timeStamp.className = "time-stamp";
    postId.appendChild(timeStamp);

    // * create div for comment then add that dext to it.
    let commentStatus = document.createElement("div");
    commentStatus.className = "comment-output";
    formContent.appendChild(commentStatus);

    // todo: create text node for each object value;
    let commentOutput = document.createTextNode(arr[objNumber]["comment"]);
    let nameOutput = document.createTextNode(arr[objNumber]["name"]);
    let timeOutput = document.createTextNode(arr[objNumber]["timestamp"]);
    nameStamp.appendChild(nameOutput);
    timeStamp.appendChild(timeOutput);
    commentStatus.appendChild(commentOutput);
    tags[i] = {
      name: nameOutput,
      comment: commentOutput,
      timestamp: timeOutput
    };
  }
}

// todo: new function to add single object values to section

// ?Validate content to make sure we have both name and comment to submit
// ?const form that will check to make sure the data is there, has event.preventDefault
// ?"if" data is valid create object that will store values that were input by form
// ?unshift object that was just created into array const. at the top of the page.

const thisSection = document.querySelector(".comment-display");
renderComments(thisSection, commentArr);

// //todo: At the event of the submission, update array and create new text to put in it
var form = document.querySelector("#comments");
form.addEventListener("submit", click => {
  click.preventDefault();
  //todo: create variables for submitted content
  let commentName = event.target.name.value;
  let commentStatus = event.target.comment.value;
  let newTimeStamp = today;
  //todo: create object containing each variable
  let newComment = {
    name: commentName,
    comment: commentStatus,
    timestamp: newTimeStamp
  };

  //todo: unshift() object into array
  commentArr.unshift(newComment);
  // todo: pop() last object from array
  // todo: rerun for statement to update comment section
  for (i = 0; i < 3; i++) {
    tags[i].name.nodeValue = commentArr[i]["name"];
    tags[i].comment.nodeValue = commentArr[i]["comment"];
    tags[i].timestamp.nodeValue = commentArr[i]["timestamp"];
  }
});

// !for loop to put comments into section FROM object that has now been updated.
// let commentOutput = document.createTextNode(arr[objNumber]["comment"]);
// let nameOutput = document.createTextNode(arr[objNumber]["name"]);
// let timeOutput = document.createTextNode(arr[objNumber]["timestamp"]);
// nameStamp.appendChild(nameOutput);
// timeStamp.appendChild(timeOutput);
// commentStatus.appendChild(commentOutput);
