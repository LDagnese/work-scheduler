// Array of objects to hold tasks. Object Properties - Date; Time; Description
var taskScheduler = [];

// loadTask method from localStorage
var loadTasks = function () {
    // get tasks from localStorage
    taskScheduler = JSON.parse(localStorage.getItem("taskScheduler"));

    // if nothing returns from localStorage create new array of objects, else set text from memory
    if (!taskScheduler) {
        taskScheduler = []
        for (let i = 8; i < 18; i++) {
            var tempObj = {
                id: i,
                text: ''
            }
            taskScheduler.push(tempObj)
        }
        localStorage.setItem("taskScheduler", JSON.stringify(taskScheduler))
    } else {
        for (let i = 0; i < taskScheduler.length; i++) {
            $(`#${taskScheduler[i].id}.time-block p`).text(taskScheduler[i].text);
        };
    };

    // Call auditTaskTime to recolor on all updates
    auditTaskTime();
};

// saveTask method to save array to localstorage
var saveTask = function () {
    localStorage.setItem("taskScheduler", JSON.stringify(taskScheduler))
}

// auditTask method
var auditTaskTime = function () {
    // get the current hour in 24 hour format to compare to time-block id
    var currentHour = moment().format('HH');

    // loop over all p element by id and set the background colors
    for (let i = 8; i < 18; i++) {
        if (i < currentHour) {
            $(`#${i}.time-block p`)
                .removeClass()
                .addClass("col-6 description past");
        } else if (i == currentHour) {
            $(`#${i}.time-block p`)
                .removeClass()
                .addClass("col-6 description present");
        } else {
            $(`#${i}.time-block p`)
                .removeClass()
                .addClass("col-6 description future");
        }
    }
};

// on click event for time-blocks to change to input
$(".time-block").on("click", "p", function () {
    // get the current text of the area
    var text = $(this)
        .text()
        .trim();

    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("col-6 descripton").val(text);
    $(this).replaceWith(textInput);

    // focus on the new element
    textInput.trigger("focus");
});

// on click of save button run saveTask
$(".saveBtn").on("click", function () {
    // Need to make sure it's a textarea element in the block selected
    if ($(this).prev().is("p")) {
        return
    }

    var inputText = $(this)
        .prev()
        .val();

    var id = $(this)
        .parent()
        .attr("id");

    // replace textInput for object matching edited id in array
    taskScheduler.forEach(function (obj) {
        if (obj.id == id) {
            obj.text = inputText;
        }
    });

    // push new taskScheduler Array to localStorage
    saveTask();

    // replace textarea with p element
    var pEl = $("<p>").addClass("col-6 descripton");
    $(this).prev().replaceWith(pEl);

    // reload tasks from localStorage
    loadTasks();
})

// Display the Current Date in the Jumbotron <p> Element on refresh or load
$("#currentDay").text(`Today is ${moment().format("LL")}`)

// need a setInterval to check the time and run auditTimeTask every minute
setInterval(auditTaskTime, 60000)

// loadTasks on refresh and load
loadTasks();

