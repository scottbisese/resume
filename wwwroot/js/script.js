const actionButton = document.getElementById('actionButton');
const audioPlayer = document.getElementById('audioPlayer');
const textContainer = document.getElementById('textContainer');
const typingText = document.getElementById('typingText');
const faceImage = document.getElementById('faceImage');
const textToType = "Hello, my name is Scott Bisese. That's Bih - Seh - SEE. I am a developer and you should hire me.";

actionButton.addEventListener("click", () => {
    actionButton.style.display = "none";
    audioPlayer.play();
    textContainer.style.display = "block";

    function typeText(index) {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(function () {
                typeText(index);
            }, 40); // Adjust typing speed (milliseconds)
        } else {
            // Text typing is complete, start fading in the face image
            fadeInFaceImage();
        }
    }

    function fadeInFaceImage() {
        let opacity = 0;
        const fadeInterval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.01; // Adjust the rate of fading as needed
                faceImage.style.opacity = opacity;
            } else {
                clearInterval(fadeInterval); // Stop fading when opacity reaches 1
            }
        }, 50); // Adjust the interval as needed
    }

    typingText.innerHTML = "";
    typeText(0);
});
