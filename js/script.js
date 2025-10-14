// The names provided in the IDs of the body tags need to be converted into the names used in the innerHTML of the navigation buttons so that the program can compare them
const pageNames = {
    "Home": "home",
    "Wainuiomata Camp": "wainui",
    "Outdoor Activities": "outdoor",
    "Community Service": "community",
    "Contact": "contact"
}

const defaultLineExtension = 20; // This is the normal line extension (referenced below) that is used for the non-hamburger menu

// This section runs the hamburger menu so that it can be toggled and the indicator line redrawn

navMenuOn = false
hamburgerButton = document.getElementById("hamburger");
navMenu = document.getElementById("menu");

hamburgerButton.addEventListener("click", function() {
    if (navMenuOn == false) {
        navMenuOn = true
        drawIndicatorLine(10);
    } else {
        navMenuOn = false
    }

    navMenu.classList.toggle("opened")
});



// This section makes the indicator line underneath the menu items in the navigation

// Define the list of <a> navigation elements and the name of the current page
let navButtons = document.querySelectorAll("nav ul li a");
let currentPage = document.querySelector("body").id;
// Also define the <a> of the current page as a global variable here
let currentButton;

// Check through the <a> elements until one of them matches the current page
for (let i = 0; i < navButtons.length; i++) {
    if (pageNames[navButtons[i].children[0].innerHTML] == currentPage) {
        // Re-set current button to this <a>
        currentButton = navButtons[i];
    }
}

// Create a div to be the line, add an ID for styling, and add the div to the current page button
let pageIndicator = document.createElement("div");
pageIndicator.id = "page-indicator";
currentButton.appendChild(pageIndicator);

// Splitting this part into a function means it can be run again when the line needs to be redrawn, such as when the hamburger menu is opened. The parameter is how much wider than the text above the line should be, which varies depending on whether it's in the normal menu or the hamburger menu. 

function drawIndicatorLine(extention) {
    pageIndicator.style.width = `${currentButton.children[0].offsetWidth + extention}px`; // Using children[0] part chooses specifically the paragraph element in the li, rather than the li itself.
    pageIndicator.style.translate = `-${extention/2}px` // Offsets the horizontal position of the line by half the total width change}
}

// The line function is then run twice. Once as soon as the page loads, in order to have the line be close to the correct size ASAP, and another to make it the perfect size after the Inter font loads, which is a slightly different width to the initial.  

drawIndicatorLine(defaultLineExtension);
document.fonts.ready.then(() => {
    drawIndicatorLine(defaultLineExtension);
});



// This section loads in all the background-image properties. Explained in diary. 

// Get every element in the document with the "image" class
let images = document.getElementsByClassName("image");
// Iterate through these images
for (let i = 0; i < images.length; i++) {
    // Check the name of the file that should be there by looking at data-src
    let src = images[i].getAttribute("data-src");
    // set the background-image property to be the correct image
    images[i].style.backgroundImage = `url(images/${src}.jpg)`;
}


// This section resizes the elements in the navigation to ensure the middle element is always centered

// Get the two left and right boxes in the footer
let linksBox = document.getElementById("external-links");
let logoBox = document.getElementById("footer-logo");

// Set up variables for the larger one and the smaller one
let smallBox;
let bigBox;

// Set the smallBox and bigBox variables
if (linksBox.offsetWidth > logoBox.offsetWidth) {
    smallBox = logoBox;
    bigBox = linksBox;
} else {
    smallBox = linksBox;
    bigBox = logoBox;
}

// When fonts are loaded, set the width of the left box to be the same as the right to center the middle box
document.fonts.ready.then(() => {
    smallBox.style.width = `${bigBox.offsetWidth}px`;
});



// This section manages the movement of the indicator line upon hover on the other navigation items. It only runs if the normal, horizontal nav exisits (on desktops), as it would be useless on phones with the vertical nav menu. 

if (window.innerWidth > 1200) {

    // The entire section is only run when the fonts load, as that changes some widths and alignments.
    document.fonts.ready.then(() => {

        // Animation settings
        const options = {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out",
        };

        // Define the navigation items. This chooses the paragraph, not the li
        let menuItems = document.querySelectorAll("#page-links li p")
        // The "boundingClientRect" returns data for where on the page the element is
        let lineRect = pageIndicator.getBoundingClientRect();

        for (let i = 0; i < menuItems.length; i++) {
            // Define the current iteration's element and its location with boundingClientRect
            let menuItem = menuItems[i];
            let menuItemRect = menuItem.getBoundingClientRect();
            // Calculate the difference between the current line location and the required location for this nav item
            let offsetX = menuItemRect.x - lineRect.x - defaultLineExtension/2;

            // Transform property for the final location of the line (after movement)
            let enterFrames = [
                {transform: `translateX(${offsetX}px)`, width: `${menuItemRect.width + defaultLineExtension}px`},
            ]

            // Add an event listener to animate the line with the above parameters upon hover on the nav item. While we generally work with the paragraph element inside the li, this time it needs to be the li, as the user should be able to hover over the entire width of the element. 
            menuItem.parentElement.addEventListener("mouseenter", function() {
                pageIndicator.animate(enterFrames, options);
            });


            // Get location of current page nav item
            let currentItemRect = currentButton.children[0].getBoundingClientRect();

            // This resets the line back to where it started, under the current page name
            let leaveFrames = [
                {transform: `translateX(0px)`, width: `${currentItemRect.width + defaultLineExtension}px`},
            ]

            // Add another event listenter to return the line to the current page name when when the user stops hovering
            menuItem.parentElement.addEventListener("mouseleave", function() {
                pageIndicator.animate(leaveFrames, options)
            });
        }

    });
}