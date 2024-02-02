document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const textContainer = document.getElementById('textContainer');
    const typingText = document.getElementById('typingText');
    const bottomRow = document.querySelector('.bottom-row');
    const columns = document.querySelectorAll('.bottom-row .column'); // Ensure this is accessible

    const textToType = "Hello, my name is Scott Bisese. That's Bih - Seh - SEE. I am a developer and you should hire me.";
    const secondText = "This website was built using .net and c#. Here are some projects I've worked on. Click on the (colored) project name to see the code.";

    // Texts for the five rows
    const rowsText = [
        "2019 \n\n MondFisch \n\n Javascript, CSS, and HTML \n\n I worked on this with a team at the DeltaV Code School. \n\n Our goal was to create a game that ultimately reveals the nuances and entropy of communication and perception. \n\n This is a multi-player game, and here is how it works:\n\n One person draws a picture. \n\n The next player describes the picture with a sentence or two.\n\n The following player then illustrates that description without seeing the previous illustration. \n\n At the end, we are left with a comic-book style print out. \n\n <a1>",
        "2020 \n\n QuaranTimesTogether \n\n Javascript, CSS, and HTML \n\n This is a project that I worked on with some friends over the quarantine. \n\n A website that allows users to find and share activities during the COVID-19 pandemic. \n\n Hosts virus tracking data. \n\n The idea is that you track the data on how fast the pandemic is spreading.. \n\n deaths, etc. but this can wear on you so.... \n\n Balancing that out, you also have the option to share and read heartwarming and positive stories about how you've used your time to change, read a book, etc. \n\n or maybe you learn about a person that taught their cat to speak english...",
        "2021 \n\n BirdWatch \n\n Java and the CLI \n\n this is a choose-your-own-adventure game that I made for a class project at Drake University. \n\n It's a text-based game that allows the user to make choices that affect the outcome of the story.\n\n Really this is just an excuse to laugh a lot and kill time. \n\n (provided that you have time to kill)",
        "2022 \n\n RandoCam \n\n Java, SpringBoot, Maven, SQL, and Azure Cloud \n\n I made an app that grabs a travel cam from this cool API that has live cameras around the world.\n\n I filter the cams so that we don't repeatedly get broken or low quality cams. \n\n The app then displays the camera, and also allows you to save the id of the camera with a comment and the title to a database \n\n Using SQL of course.",
        "2023 \n\n SpotifyPlaylistBuilder \n\n Python, JS, CSS, HTML, and the SpotifywebAPI \n\n I worked as a team at Drake University to build this for a software engineering class. \n\n This builds a playlist in Spotify for you based on your top songs. \n\n The currently deployed version is the one we built as a team, but I have a version that runs in the CLI that makes an awesome playlist based on machine learning and not Spotify recommending artists that pay Spotify to promote them ahead of every one else. \n\n V2 also handles the 0auth2.0 much better than the currently deployed version. \n\n I will add a front end to this version and deploy soon, so stay tuned... \n\n <a5> "
    ];

    actionButton.addEventListener("click", () => {
        actionButton.style.display = "none";
        audioPlayer.play();
        textContainer.style.display = "block";
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

    function startSecondText() {
        const secondLine = document.createElement('div');
        textContainer.appendChild(secondLine); // Append it to the textContainer
        typeText(secondText, secondLine, () => {
            startTypingInColumns(); // Start typing "hello" in columns after secondText
        });
    }

    function startTypingInColumns() {
        const columns = document.querySelectorAll('.bottom-row .column');
        columns.forEach((column, index) => {
            if (index < rowsText.length) {
                // Prepare the text for typing (remove HTML placeholders)
                let plainText = rowsText[index].replace(/<br>/g, '\n').replace(/<.*?>.*?<\/.*?>/g, ""); // Simplistic removal
    
                // Type the text
                typeText(plainText, column, () => {
                    // After typing is done, convert the text for HTML
                    let htmlText = rowsText[index]
                    .replace(/\n/g, '<br>') // Replace \n with <br>
                    .replace('MondFisch', '<a href="https://github.com/scottbisese/Mondfisch" target="_blank" style="color: red;">MondFisch</a>')
                    .replace('QuaranTimesTogether', '<a href="https://github.com/scottbisese/quarantimesTogether" target="_blank" style="color: orange;">QuaranTimesTogether</a>')
                    .replace('BirdWatch', '<a href="https://github.com/scottbisese/BirdWatch" target="_blank" style="color: yellow;">BirdWatch</a>')
                    .replace('RandoCam', '<a href="https://github.com/scottbisese/rand0cam" target="_blank" style="color: green;">RandoCam</a>')
                    .replace('SpotifyPlaylistBuilder', '<a href="https://github.com/scottbisese/spotifyPlaylistBuilder" target="_blank" style="color: blue;">Spotify Playlist Builder</a>')
                    .replace('<a1>', '<a href="https://www.randoc.am/" target="_blank">Live Deployment</a>')
                    .replace('<a5>', '<a href="https://endgoalspotifyplaylistbuilder.azurewebsites.net/" target="_blank">Live Deployment</a>');
    
                    // Directly set the HTML content after typing is complete
                    column.innerHTML = htmlText;
                });
            }
        });
    }

    function typeText(text, element, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 40); // Adjust typing speed
            } else if (callback) {
                callback(); // Call the callback function once typing is complete
            }
        }
        type();
    }

    function fadeOutElement(element, callback) {
        element.style.transition = "opacity 1s ease-in-out";
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.display = "none";
            if (callback) callback();
        }, 1000); 
    }
});