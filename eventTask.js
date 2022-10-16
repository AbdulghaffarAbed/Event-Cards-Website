//localStorage.clear();


/**
 * openEventTask used to open eventTask page when click on List button
 */


function openEventTask() {
    window.location = "eventTask.html"
}


/**
 * openCreateEventPage used to open form page when click on form button
 */


function openCreateEventPage() {

    const cardActionObject = { "id": "xx", "buttonStatus": "Add" };
    localStorage.setItem("cardUpdate", JSON.stringify(cardActionObject));
    window.location = "createEventPage.html"
}

/**
 * updateCards function will executed every time the page loaded
 * It will check if there's events in the local storage and display it
 * Through its flow it will check event date and change its background color depending on that
 */


function updateCards() {

    let count = parseInt(localStorage.getItem("counter"))-1;        // Read counter from the local storage
    let cardID = "card" + count;                                    // create a unique id for card divs
    let cardEventObj = JSON.parse(localStorage.getItem(cardID));    // Read event data using the id
    

    // Cardcodes represent the html code for each event card 
    // Here it will read the first event only then read all other events later in the loop 
    let cardsCode = `<div class="cardDiv" id="${cardID}" onclick="cardView(this.id)">
    <div id="cnmae" class="cname">
        <span class="nameLabel" id="nameLabel">Name: </span>
        <span class="nameVal" id="nameVal">${cardEventObj.name}</span>
    </div>

    <div class="cdescription" id="cdescription">
        <span class="descriptionLabel" id="descriptionLabel">Description:<br><br></span>
        <span class="descriptionVal" id="descriptionVal">${cardEventObj.description}</span>
    </div>

    <div class="cdate" id="cdate">
        <span class="dateLabel" id="dateLabel">Date: </span>
        <span class="dateVal" id="dateVal">${cardEventObj.date}</span>
    </div>
    </div>`;
    
    --count;            // Decrement counter to read the next event

    /**
     * This loop responsible for read events data and build html code for each one 
     */


    while (0 <= count) {    
        let cardID = "card" + count;                                        // create a unique id for card divs
        let cardEventObj = JSON.parse(localStorage.getItem(cardID));        // Read event data using the id

        // concatenate all events html code into one string to add them in the html page later using html event.
        cardsCode +=
            `<div class="cardDiv" id="${cardID}" onclick="cardView(this.id)">
            <div id="cnmae" class="cname">
                <span class="nameLabel" id="nameLabel">Name: </span>
                <span class="nameVal" id="nameVal">${cardEventObj.name}</span>
            </div>

            <div class="cdescription" id="cdescription">
                <span class="descriptionLabel" id="descriptionLabel">Description:<br><br></span>
                <span class="descriptionVal" id="descriptionVal">${cardEventObj.description}</span>
            </div>

            <div class="cdate" id="cdate">
                <span class="dateLabel" id="dateLabel">Date: </span>
                <span class="dateVal" id="dateVal">${cardEventObj.date}</span>
            </div>
            </div>`;

        count--;                // Decrement counter to read the next event
    }

    console.log(cardsCode);                                                 // This line used for debugining
    document.getElementById("cardSections").innerHTML = cardsCode;          // Add events code to html page

    /**
     * The below statments used to check the date for each event
     */


    let count1 = parseInt(localStorage.getItem("counter"))-1;
    while (0 <= count1) {
        let cardID1 = "card" + count1;
        let cardEventObj1 = JSON.parse(localStorage.getItem(cardID1));
        checkDate(cardEventObj1.date, cardID1);
        count1--;
    }

}




/**
 * checkDate function used to decide event card background color 
 * based on its date which have 3 cases:
 * 1. present => background color Green
 * 2. past => background color Red
 * 3. future => background color purple
 */



function checkDate(date, cardID) {

    // find the current date 
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonthAndYear = currentYear + ((currentDate.getMonth() + 1)/10);
    let currentDay = currentDate.getDate();

    // Split event date into array 
    const dateArray = date.split("-");
    let eventMonthAndYear = parseInt(dateArray[0]) + (parseInt(dateArray[1])/10);
    let eventDay = parseInt(dateArray[2]);

    /**
     * Firstly compare the summation of both year and month
     * then if it's required compare current day with the event day
     */

    if (eventMonthAndYear > currentMonthAndYear) {
        document.getElementById(cardID).style.backgroundColor = "rgb(241, 117, 241)";
    } else if (eventMonthAndYear < currentMonthAndYear) {
        document.getElementById(cardID).style.backgroundColor = "rgb(248, 91, 91)";
    } else {
        if (eventDay > currentDay) {
            document.getElementById(cardID).style.backgroundColor = "rgb(241, 117, 241)";
        } else if (eventDay < currentDay) {
            document.getElementById(cardID).style.backgroundColor = "rgb(248, 91, 91)";
        } else {
            document.getElementById(cardID).style.backgroundColor = "rgb(127, 247, 127)";
        }
    }

}

/**
 * cardView function used to display card data into createEventPage fields
 * also used to change button to Save instead of add because the operation here is update
 * @param {*} cardID represent the clicked card id attribute
 */


function cardView(cardID) {

    console.log("cardID : " + cardID);
    const cardActionObject = { "id": cardID, "buttonStatus": "Save" };
    localStorage.setItem("cardUpdate", JSON.stringify(cardActionObject));

    // Open createEventPage
    window.location = "createEventPage.html"
}