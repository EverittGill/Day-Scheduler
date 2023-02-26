// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button.
  // $(".btn").click(function(){
  //   console.log(this)
  // })


  //  This code should use the id in the containing time-block as a key to save the user input in local storage.

  // HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


const currentDateTime = dayjs(); // create a DayJS object for the current date and time
const formattedDateTime = currentDateTime.format('YYYY-MM-DD HH:mm:ss'); // format the date and time

console.log(`The current date and time is ${formattedDateTime}`); // output the current date and time to the 




let arr = $(".row")

var date = new Date()
var currentHour = date.getHours() + 1;
console.log(currentHour, "test line 41")
console.log(date, "line 42")

$("#currentDay").text(formattedDateTime)

if (localStorage.getItem("timeSlots")) {
  renderText()
}

function renderText (){
  let storage = JSON.parse(localStorage.getItem("timeSlots"))
for (let i = 0; i < storage.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (storage[i].id === arr[j].id.split("-")[1]) {
      arr[j].children[1].value = storage[i].value
    }
  }
}
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
  if (arr[i].id.split('-')[1] === currentHour.toString()) {
    $("#" + arr[i].id).addClass("present")
  } else if (parseInt(arr[i].id.split('-')[1]) > currentHour) {
    $("#" + arr[i].id).addClass("future")
  } else if (parseInt(arr[i].id.split('-')[1]) < currentHour) {
    $("#" + arr[i].id).addClass("past")
  }
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i].children[2])
  arr[i].children[2].addEventListener("click", (event) => {
    bubble(event.target)

  })
}


function bubble(element) {
  if (!element.id.includes('hour')) {
    bubble(element.parentNode)
  } else {
    console.log(element)
    putInLocalStorage(element)
  }
}




function putInLocalStorage(element) {
  let storage = JSON.parse(localStorage.getItem("timeSlots"))
  if (localStorage.getItem("timeSlots")) {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id === element.id.split('-')[1]) {
        storage[i].value = element.children[1].value
        localStorage.setItem("timeSlots", JSON.stringify(storage))
        console.log(JSON.parse(localStorage.getItem("timeSlots")))

        return
      }
    }
    storage.push(
      {
        id: element.id.split("-")[1],
        value: element.children[1].value
      }
    )
    localStorage.setItem("timeSlots", JSON.stringify(storage))
  } else {
    let arr = [
      {
        id: element.id.split("-")[1],
        value: element.children[1].value
      }
    ]
    localStorage.setItem("timeSlots", JSON.stringify(arr))
  }
  console.log(JSON.parse(localStorage.getItem("timeSlots")))
}

