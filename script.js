// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textInput = document.querySelector('[name="text"]');

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

// Set voice when selected
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
}

// Update rate and pitch
function setOption() {
    msg[this.name] = this.value;
}

// Speak function
function speak() {
    if (!textInput.value.trim()) {
        alert("Please enter some text to speak!");
        return;
    }
    speechSynthesis.cancel(); // Reset any ongoing speech
    msg.text = textInput.value;
    speechSynthesis.speak(msg);
}

// Stop function
function stop() {
    speechSynthesis.cancel();
}

// Populate voices list when available
speechSynthesis.onvoiceschanged = populateVoices;

// Event Listeners
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
