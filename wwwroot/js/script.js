const actionButton = document.getElementById('actionButton');
const audioPlayer = document.getElementById('audioPlayer');
const textContainer = document.getElementById('textContainer');
const typingText = document.getElementById('typingText');
const bottomRow = document.querySelector('.bottom-row');

const textToType = "Hello, my name is Scott Bisese. That's Bih - Seh - SEE. I am a developer and you should hire me.";
const secondText = "Here are some projects I've worked on, click the date to see the project in a new tab.";

// Texts for the five rows
const rowsText = [
    "MondFisch \n This is a project I worked on at the DeltaV Code School. It uses Javascript, CSS, and HTML to create a game that ultimately reveals the nuances of individual perception.",
    "QuaranTimesTogether \n This is a project that I worked on with some friends over the initial quarantine. It uses Javascript, CSS, and HTML to create a website that allows users to find and share activities to do during the COVID-19 pandemic, as well as data tracking for the virus.",
    "BirdWatch \n Using Java, this is a choose-your-own-adventure game that I made for a class project at Drake University. It's a text-based game that allows the user to make choices that affect the outcome of the story. File under comedy.",
    "RandoCam \n Using Java, SpringBoot, Maven, SQL, and Azure Cloud, I made a site that grabs a travel cam from this cool API that has live cameras around the world, filters the result so its not a broken or low definition camera, displays the camera, and also allows you to save the id of the camera with a comment and the title to a database.",
    "Spotify Playlist Builder \n This builds a playlist in Spotify for you that doesn't use the pay-to-play suggestion algorithm, and instead is just honest recommendations for your taste, based on unbiased machine learning. Uses Python, JS, CSS, HTML, Spotipy, and the SpotifywebAPI. "
  ];

actionButton.addEventListener("click", () => {
    actionButton.style.display = "none";
    audioPlayer.play();
    textContainer.style.display = "block";

    function typeText(text, element, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 40); // Adjust typing speed (milliseconds)
            } else if (callback) {
                callback(); // Call the callback function once typing is complete
            }
        }
        type();
    }

    function startSecondText() {
        // Create a new element for the second line of text
        const secondLine = document.createElement('div');
        textContainer.appendChild(secondLine); // Append it to the textContainer

        // Start typing the second text
        typeText(secondText, secondLine, null);
    }

    function fadeOutElement(element, callback) {
        element.style.transition = "opacity 1s ease-in-out";
        element.style.opacity = "0";
        setTimeout(callback, 1000); // Wait for the fade out to complete
    }

    typingText.innerHTML = ""; // Clear previous text
    typeText(textToType, typingText, () => {
        setTimeout(() => {
            fadeOutElement(typingText, () => {
                // Once fade out is complete, start the second line of text
                startSecondText();
            });
            // Fade in the bottom row simultaneously with the start of the second text
            bottomRow.style.transition = "opacity 1s ease-in-out";
            bottomRow.style.opacity = "1";
        }, 2000); // Wait 2 seconds before starting fade out and second text
    });

    // Initialize with opacity 0 to ensure it starts invisible
    bottomRow.style.opacity = "0";
});

function startTypingInColumns() {
    // Use rowsText for the project descriptions
    rowsText.forEach((text, index) => {
        const column = column[index]; // Directly use the queried columns
        if (!column) return; // Skip if the column doesn't exist

        // Clear existing content except for the <a> tag
        const link = column.querySelector('a');
        const tempLink = link.cloneNode(true); // Clone the <a> tag to preserve it
        column.innerHTML = ''; // Clear the column
        column.appendChild(tempLink); // Re-add the <a> tag

        // Function to append text before the <a> tag
        function appendTextBeforeLink(textPart) {
            const textNode = document.createTextNode(textPart);
            column.insertBefore(textNode, tempLink);
        }

        // Type text, then update the <a> tag's text
        typeText(text, appendTextBeforeLink, () => {
            tempLink.textContent = "Click here to find out more."; // Update link text
            // Optionally, update tempLink.href here if needed
        });
    });
}

// Modify typeText to accept a function for appending text
function typeText(text, appendFunc, callback) {
    let index = 0;
    (function type() {
        if (index < text.length) {
            appendFunc(text.charAt(index));
            index++;
            setTimeout(type, 40); // Adjust typing speed
        } else if (callback) {
            callback(); // Call callback function once typing is complete
        }
    })();
}

// Update the part where the second text typing is completed to also start typing in the columns
function startSecondText() {
    // Create a new element for the second line of text
    const secondLine = document.createElement('div');
    textContainer.appendChild(secondLine); // Append it to the textContainer

    // Start typing the second text
    typeText(secondText, secondLine, () => {
        // Once the second text is complete, start typing in columns
        startTypingInColumns();
    });

    function startTypingInColumns() {
        // Iterate over each column and start typing
        columns.forEach((column, index) => {
            if (index < rowsText.length) {
                const text = rowsText[index];
                const link = column.querySelector('a'); // Assume there's an <a> tag to update
                typeText(text, column, () => {
                    link.textContent = "Click here to find out more."; // Update or append to link text
                });
            }
        });
    }
}