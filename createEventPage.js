/*
* Initialize counter to append it to the event data array key
* That made the key unique and prevent access proplems for its data
*/

//localStorage.clear();
var counter;                // Define counter that will used to make id for div cards unique
var formStatus = "Add";     // specify that the page opend for add a new event or update existed one

/**
 * openEventTask used to open eventTask page when click on List button
 */


function openEventTask() {

    window.location = "eventTask.html"
}

/**
 * openCreateEventPage used to open form page when click on form button
 * In addition, this function will used when click on cancel button
 */


function openCreateEventPage() {
    window.location = "createEventPage.html"
}

/**
 * The aim of this function is to check if the createEventPage opened for
 * update and show an existed event data or to create a new event 
 */


function updateOrNew() {
    //localStorage.clear();
    if (counter == undefined) {

        if (parseInt(localStorage.getItem("counter")) >= 0) {
            counter = parseInt(localStorage.getItem("counter"));

        } else {
            counter = 0;
            localStorage.setItem("counter", counter);

        }

    }

    let cardActionObject = JSON.parse(localStorage.getItem("cardUpdate"));
    console.log("status: " + cardActionObject.buttonStatus);
    if (cardActionObject.buttonStatus == "Save") {


        formStatus = "update"                       // Change the global variable to tell functions that the form open for update
        document.getElementById("saveOrAddButton").setAttribute("value", "Save");               // Change button value from Add to Save

        // Fill the event fields with event values
        let cardEventObj = JSON.parse(localStorage.getItem(cardActionObject.id));
        document.getElementById("nameField").setAttribute("value", cardEventObj.name);
        document.getElementById("descriptionTextArea").innerHTML = cardEventObj.description;
        document.getElementById("dateField").setAttribute("value", cardEventObj.date);

        cardActionObject.buttonStatus = "Add"        // Return the behavior to default which is add a new event
        localStorage.setItem("cardUpdate", JSON.stringify(cardActionObject));

    } else {

        document.getElementById("saveOrAddButton").setAttribute("value", "Add");        // Change button value to Add
    }

}

/**
 * The aim of this function is to receive the input data from form fields
 * Before store data operation it will check if the action update an exist event or create a new one
 * Then store them into object and assign a unquie id for each object using counter
 */


function getFormData() {

    event.preventDefault();
    // Read the entered data from form fileds
    let name = document.getElementById("nameField").value;
    let description = document.getElementById("descriptionTextArea").value;
    let date = document.getElementById("dateField").value;

    const eventData = { "name": name, "description": description, "date": date };   // Define object that contians form data

    // In case of add a new event
    if (formStatus == "Add") {

        let cardID = "card" + localStorage.getItem("counter");             // Create id to distinguish the card 
        localStorage.setItem(cardID, JSON.stringify(eventData));           // Store form data in JSON syntax into the local storage
        localStorage.setItem("counter", counter += 1);                     // Increment counter for each new Event
        let cardActionObject1 = JSON.parse(localStorage.getItem(cardID));
        console.log("id: " + cardID + " name: " + eventData.name + " desc: " + eventData.description + " date: " + eventData.date);

    } else {

        /**
         * Read the id for the card that we want to update from local storage and update it 
         */


        let cardActionObject = JSON.parse(localStorage.getItem("cardUpdate"));
        let cardID = cardActionObject.id;
        localStorage.setItem(cardID, JSON.stringify(eventData));

    }

}

