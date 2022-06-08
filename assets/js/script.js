// Array of objects to hold tasks. Object Properties - Date; Time; Description
var taskScheduler = [];

// get today in moment day format
var today = moment().format("YYYYMMDD");

// loadTask method
var loadTasks = function () {
    // get tasks from localStorage
    taskScheduler = JSON.parse(localStorage.getItem("taskScheduler"));

    if (!taskScheduler) {
        taskScheduler = []
        for (let i = 8; i < 18; i++) {
            var tempObj = {
                id: i,
                text: ''
            }
            taskScheduler.push(tempObj)
        }
        localStorage.setItem("taskScheduler",JSON.stringify(taskScheduler))
    } else {
        for (let i = 0; i < taskScheduler.length; i++) {
            $(`#${taskScheduler[i].id}.time-block p`).text(taskScheduler[i].text);
        };
    };
};

// saveTask method
var saveTask = function (taskTimeID, taskText) {
    localStorage.setItem("taskScheduler", JSON.stringify(taskScheduler))
}

// auditTask method

// Display the Current Date in the Jumbotron <p> Element
$("#currentDay").text(`Today is ${moment().format("LL")}`)

// on click event for time-blocks to change to input
$(".time-block").on("click","p",function () {
    // get the current text of the area
    var text = $(this)
        .text()
        .trim();
    
    // get the ID
    var timeID = $(this).parent().attr("id");
    console.log(timeID);

    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("col-6 descripton").val(text);
    $(this).replaceWith(textInput);

    // focus on the new element
    textInput.trigger("focus");
});

// on click of save button run saveTask
$(".saveBtn").on("click",function (){
    var inputText = $(this)
        .prev()
        .val();
    
    var id = $(this)
        .parent()
        .attr("id");

    taskScheduler.forEach(function(obj) {
        if (obj.id == id) {
            obj.text = inputText;
        }
    })

    saveTask();

    // replace textarea with p element
    var pEl = $("<p>").addClass("col-6 descripton")
    $(this).prev().replaceWith(pEl)

    loadTasks();

})

loadTasks();

