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
    if (pageNames[navButtons[i].children[0].innerHTML] == currentPage) {
        // Re-set current button to this <li>
        currentButton = navButtons[i];
    }
}

// Create a div to be the line, add an ID for styling, and add the div to the current page button
let pageIndicator = document.createElement("div");
pageIndicator.id = "page-indicator";
currentButton.appendChild(pageIndicator);

// The line to then resize the line is run twice. Once as soon as the page loads, in order to have the line be close to the correct size ASAP, and another to make it the perfect size after the Inter font loads, which is a slightly different width to the initial. The children[0] part chooses specifically the paragraph element in the li, rather than the li itself. 
pageIndicator.style.width = `${currentButton.children[0].offsetWidth + lineExtension}px`;
document.fonts.ready.then(() => {
    pageIndicator.style.width = `${currentButton.children[0].offsetWidth + lineExtension}px`;
});

pageIndicator.style.translate = `-${lineExtension/2}px` // Offsets the horizontal position of the line by half the total width change



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


// This section of code manages the movement of the indicator line upon hover on the other navigation items
// The entire section is only run when the fonts load, as that changes some widths and alignments
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
        let offsetX = menuItemRect.x - lineRect.x - lineExtension/2;

        // Transform property for the final location of the line (after movement)
        let enterFrames = [
            {transform: `translateX(${offsetX}px)`, width: `${menuItemRect.width + lineExtension}px`},
        ]

        // Add an event listener to animate the line with the above parameters upon hover on the nav item. While we generally work with the paragraph element inside the li, this time it needs to be the li, as the user should be able to hover over the entire width of the element. 
        menuItem.parentElement.addEventListener("mouseenter", function() {
            pageIndicator.animate(enterFrames, options);
            // console.log("Run mouseenter")
            // console.log(menuItem)
            // console.log(`${menuItemRect.x} - ${lineRect.x} - ${lineExtension/2} = ${offsetX}`)
            // console.log(enterFrames)
        });


        // Get location of current page nav item
        let currentItemRect = currentButton.children[0].getBoundingClientRect();

        // This resets the line back to where it started, under the current page name
        let leaveFrames = [
            {transform: `translateX(0px)`, width: `${currentItemRect.width + lineExtension}px`},
        ]

        // Add another event listenter to return the line to the current page name when when the user stops hovering
        menuItem.parentElement.addEventListener("mouseleave", function() {
            pageIndicator.animate(leaveFrames, options)
        });
    }

});
