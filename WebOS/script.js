// ========================================
// KHALIDOS WINDOW SYSTEM
// ========================================

// Keeps track of which window should be on top
var biggestIndex = 10;


// ========================================
// KHALIDOS CLOCK
// ========================================

function updateTime() {

    var currentTime = new Date().toLocaleString();

    var timeText =
        document.querySelector("#timeElement");

    timeText.innerHTML = currentTime;
}


// Run immediately
updateTime();


// Update every second
setInterval(updateTime, 1000);



// ========================================
// SELECT WELCOME WINDOW
// ========================================

var welcomeScreen =
    document.querySelector("#welcome");

var welcomeScreenClose =
    document.querySelector("#welcomeclose");

var welcomeScreenOpen =
    document.querySelector("#welcomeopen");



// ========================================
// OPEN / CLOSE WINDOWS
// ========================================

function closeWindow(element) {

    element.style.display = "none";

}


function openWindow(element) {

    element.style.display = "flex";

    // Bring opened window to front
    biggestIndex++;

    element.style.zIndex = biggestIndex;

}


// ========================================
// BRING WINDOW TO FRONT
// ========================================

function handleWindowTap(element) {

    biggestIndex++;

    element.style.zIndex = biggestIndex;

}



// ========================================
// WELCOME WINDOW BUTTONS
// ========================================

welcomeScreenClose.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        closeWindow(welcomeScreen);

    }
);


welcomeScreenOpen.addEventListener(
    "click",
    function() {

        openWindow(welcomeScreen);

    }
);



// ========================================
// WELCOME WINDOW FOCUS
// ========================================

welcomeScreen.addEventListener(
    "mousedown",
    function() {

        handleWindowTap(welcomeScreen);

    }
);



// ========================================
// MAKE WELCOME WINDOW DRAGGABLE
// ========================================

dragElement(welcomeScreen);



// ========================================
// DRAG WINDOW FUNCTION
// ========================================

function dragElement(element) {

    var initialX = 0;
    var initialY = 0;

    var currentX = 0;
    var currentY = 0;


    // Find the title bar / drag handle
    var header =
        document.getElementById(
            element.id + "header"
        );


    // If the window has a header,
    // drag only from the header
    if (header) {

        header.onmousedown = startDragging;

    }

    // Otherwise drag from anywhere
    else {

        element.onmousedown = startDragging;

    }



    // ====================================
    // START DRAGGING
    // ====================================

    function startDragging(event) {

        event =
            event || window.event;


        // Don't drag when clicking
        // window buttons
        if (
            event.target.closest(
                ".window-buttons"
            )
        ) {

            return;

        }


        event.preventDefault();


        // Bring window to front
        handleWindowTap(element);


        // Save starting mouse position
        initialX = event.clientX;
        initialY = event.clientY;


        // Track mouse movement
        document.onmousemove =
            moveElement;


        // Stop when mouse released
        document.onmouseup =
            stopDragging;

    }



    // ====================================
    // MOVE WINDOW
    // ====================================

    function moveElement(event) {

        event =
            event || window.event;

        event.preventDefault();


        // Calculate mouse movement
        currentX =
            initialX - event.clientX;

        currentY =
            initialY - event.clientY;


        // Save new mouse position
        initialX =
            event.clientX;

        initialY =
            event.clientY;


        /*
        Some KhalidOS windows begin centered using:

        transform: translate(-50%, -50%)

        Convert that position into pixels
        before moving the window.
        */

        if (
            getComputedStyle(element).transform !== "none" &&
            element.style.transform !== "none"
        ) {

            var rect =
                element.getBoundingClientRect();


            element.style.left =
                rect.left + "px";

            element.style.top =
                rect.top + "px";

            element.style.transform =
                "none";

        }


        // Move vertically
        element.style.top =
            (
                element.offsetTop - currentY
            ) + "px";


        // Move horizontally
        element.style.left =
            (
                element.offsetLeft - currentX
            ) + "px";

    }



    // ====================================
    // STOP DRAGGING
    // ====================================

    function stopDragging() {

        document.onmouseup = null;

        document.onmousemove = null;

    }

}



// ========================================
// KHALIDOS NOTEPAD
// ========================================

var notepad =
    document.querySelector("#notepad");

var notepadIcon =
    document.querySelector("#notepadIcon");

var notepadClose =
    document.querySelector("#notepadclose");

var notepadText =
    document.querySelector("#notepadText");

var characterCount =
    document.querySelector("#characterCount");



// ========================================
// MAKE NOTEPAD DRAGGABLE
// ========================================

dragElement(notepad);



// ========================================
// NOTEPAD WINDOW FOCUS
// ========================================

notepad.addEventListener(
    "mousedown",
    function() {

        handleWindowTap(notepad);

    }
);



// ========================================
// OPEN NOTEPAD
// ========================================

notepadIcon.addEventListener(
    "click",
    function() {

        openWindow(notepad);

    }
);



// ========================================
// CLOSE NOTEPAD
// ========================================

notepadClose.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        closeWindow(notepad);

    }
);



// ========================================
// CHARACTER COUNTER
// ========================================

notepadText.addEventListener(
    "input",
    function() {

        var characters =
            notepadText.value.length;


        characterCount.innerHTML =
            characters + " characters";

    }
);

// ========================================
// KHALIDOS WEATHER APP
// ========================================

var weather =
    document.querySelector("#weather");

var weatherIcon =
    document.querySelector("#weatherIcon");

var weatherClose =
    document.querySelector("#weatherclose");

var weatherDate =
    document.querySelector("#weatherDate");



// ========================================
// MAKE WEATHER DRAGGABLE
// ========================================

dragElement(weather);



// ========================================
// WEATHER WINDOW FOCUS
// ========================================

weather.addEventListener(
    "mousedown",
    function() {

        handleWindowTap(weather);

    }
);



// ========================================
// OPEN WEATHER
// ========================================

weatherIcon.addEventListener(
    "click",
    function() {

        openWindow(weather);

    }
);



// ========================================
// CLOSE WEATHER
// ========================================

weatherClose.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        closeWindow(weather);

    }
);



// ========================================
// WEATHER DATE
// ========================================

function updateWeatherDate() {

    var currentDate =
        new Date().toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    weatherDate.innerHTML =
        currentDate;

}


updateWeatherDate();