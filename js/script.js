// The names provided in the IDs of the body tags need to be converted into the names used in the innerHTML of the navigation buttons so that the program can compare them
const pageNames = {
    "Home": "home",
    "Wainuiomata Camp": "wainui",
    "Outdoor Activities": "outdoor",
    "Community Service": "community",
    "Contact": "contact"
}

const lineExtension = 20; // Distance by which to extend the nav indicator line past the edge of the text above

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

pageIndicator.style.translate = `-${lineExtension/2}px` // Offsets the horizontal position of the line by half the total width change

// The line to then resize the line is run twice. Once as soon as the page loads, in order to have the line be close to the correct size ASAP, and another to make it the perfect size after the Inter font loads, which is a slightly different width to the initial. 
pageIndicator.style.width = `${currentButton.offsetWidth + lineExtension}px`;
document.fonts.ready.then(() => {
    pageIndicator.style.width = `${currentButton.offsetWidth + lineExtension}px`;
});


// Get every element in the document with the "image" class
let images = document.getElementsByClassName("image");
// Iterate through these images
for (let i = 0; i < images.length; i++) {
    // Check the name of the file that should be there by looking at data-src
    let src = images[i].getAttribute("data-src");
    // set the background-image property to be the correct image
    images[i].style.backgroundImage = `url(images/${src}.jpg)`;
}


// Get the two left and right boxes in the footer
let linksBox = document.getElementById("external-links");
let logoBox = document.getElementById("footer-logo");

// When fonts are loaded, set the width of the left box to be the same as the right to center the middle box
document.fonts.ready.then(() => {
    logoBox.style.width = `${linksBox.offsetWidth}px`;
});
