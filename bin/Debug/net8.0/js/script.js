document.getElementById('actionButton').addEventListener('click', function() {
    // Play the audio
    document.getElementById('audioPlayer').play();

    // Flash the screen
    document.body.style.backgroundColor = "white";
    setTimeout(function() {
        document.body.style.backgroundColor = "";
    }, 100); // Adjust timing for longer flash
});