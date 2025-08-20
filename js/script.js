// The names provided in the IDs of the body tags need to be converted into the names used in the
// innerHTML of the navigation buttons so that the program can compare them
const pageNames = {
    "Home": "home",
    "Wainuiomata Camp": "wainui",
    "Outdoor Activities": "outdoor",
    "Community Service": "community",
    "Contact": "contact"
}

// Define the list of <li> navigation elements and the name of the current page
let navButtons = document.querySelectorAll("nav ul li");
let currentPage = document.querySelector("body").id;
// Also define the <li> of the current page as a global variable here
let currentButton;

// Check through the <li> elements until one of them matches the current page
for (let i = 0; i < navButtons.length; i++) {
    if (pageNames[navButtons[i].innerHTML] == currentPage) {
        // Re-set current button to this <li>
        currentButton = navButtons[i];
    }
}

// Create a div to be the line, add an ID for styling, and add the div to the current page button
let pageIndicator = document.createElement("div");
pageIndicator.id = "page-indicator";
currentButton.appendChild(pageIndicator);

// The line to then resize the line is run twice. Once as soon as the page loads, in order to
// have the line be close to the correct size ASAP, and another to make it the perfect size after
// the Inter font loads, which is a slightly different width to the initial. 
pageIndicator.style.width = `${currentButton.offsetWidth + 20}px`;
document.fonts.ready.then(() => {
    pageIndicator.style.width = `${currentButton.offsetWidth + 20}px`;
});
