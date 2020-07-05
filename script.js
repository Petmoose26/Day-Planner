//1. get all text area.
var allTextArea = $("textarea");
//2. loop through 0-8.
for (var i = 0; i < allTextArea.length; i++) {
  var note = localStorage.getItem(i);
  console.log(note);
  if (note) {
    allTextArea[i].value = note;
  }
}
//3. check to see if value is saved for that index.
//4. if yes add to text area.
// get for day and time.
$("#currentDay").append(moment().format("MMMM Do YYYY, h:mm:ss a"));

var currentTime = moment();

// 1. define the colors.

var elementTimes = $(".time");
// This will BREAK if the hour and time of day do not have a space
// between them

elementTimes.each(function () {
  var currentElement = $(this);
  var currentElementTime = currentElement.html();

  var currentElementMoment = parseCurrentElementTime(currentElementTime);

  if (currentElementMoment.hour() < currentTime.hour()) {
    currentElement.addClass("past");
  } else if (currentElementMoment.hour() > currentTime.hour()) {
    currentElement.addClass("future");
  } else {
    currentElement.addClass("present");
  }
});

//extract out elements hour and convert to a number.
//this will BREAK if hour is in PM.

function parseCurrentElementTime(hourString) {
  // split the hour string into hour and time of day
  const hourAndTimeOfDay = hourString.split(" ");
  let hour = hourAndTimeOfDay[0];
  const timeOfDay = hourAndTimeOfDay[1];
  // convert the hour to a number
  hour = parseInt(hour);
  // if time of day is PM, then add 12 to hour
  if (timeOfDay.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  }
  // get the current datetime
  let currentElementDateTime = moment();
  // set the hour of current datetime to the hour we extracted
  // and set minutes and seconds to 0
  currentElementDateTime.set({ h: hour, m: 0, s: 0 });

  // return the new time of day moment object
  return currentElementDateTime;
}

// 2. (example)compare current time and current element time.
// 3. if past time is < current time add past class.

//when user clicks in the box, they can type text.

//add onclick to button to save text.
$(".btn").on("click", function () {
  //text area saves to local storage.
  const textAreaIndex = parseInt(this.id.split("-")[1]);

  // 1.get value from text area.
  allTextArea = $("textarea");
  var note = allTextArea[textAreaIndex].value;
  localStorage.setItem(textAreaIndex, note);

  // 2.save it. (save in a way to load easy later).
});

// when page refreshes, text loads in from local storeage.
