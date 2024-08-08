document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const resultPlace = document.getElementById('output');
    const getLang = document.getElementById('language');

    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }

    // Create a new instance of SpeechRecognition
    const recognition = new webkitSpeechRecognition(); // Use 'SpeechRecognition' for other browsers

    // Start recognition when the button is clicked
    startButton.addEventListener('click', () => {
        const selectedLanguage = getLang.value;
        recognition.lang = selectedLanguage; // Set language based on user selection
        recognition.interimResults = true; // Show interim results
        recognition.start();
        resultPlace.value = ''; // Clear the text area
    });

    // Process the results as they are received
    recognition.addEventListener('result', (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultPlace.value = transcript;
    });

    // Handle errors
    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error', event.error);
    });

    // Stop recognition when the user stops speaking
    recognition.addEventListener('end', () => {
        recognition.stop();
    });
});
