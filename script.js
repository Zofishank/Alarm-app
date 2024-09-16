const curr_time = document.querySelector(".currTime");
const set_time = document.querySelector(".setTime");
const stop_btn = document.querySelector(".stopAlarm");
const setAlarmDiv = document.querySelector(".set_alarm_div");
const alarmList = document.querySelector(".alarmList");
const recent_alarms = document.querySelector(".recent_alarms");
const selectSoundDiv = document.querySelector(".select_sound_div");
const sounds_btn = document.querySelector(".sounds_btn");
const msg_div = document.querySelector(".msg");

const alarmSound1 = new Audio("music.mp3");
const alarmSound2 = new Audio("music2.wav");
const alarmSound3 = new Audio("music3.wav");
const alarmSound4 = new Audio("music4.wav");
const alarmSound5 = new Audio("music5.wav");

let selectedAlarmSound = alarmSound1;

// Simplified array for sounds
let alarmSounds = [alarmSound1, alarmSound2, alarmSound3, alarmSound4, alarmSound5];

stop_btn.style.display = "none";
let alarmTimeout;

// Show the current date and time
const currentTime = () => {
    const date = new Date();
    const now = date.toLocaleTimeString("en-US", { hour12: false });
    curr_time.innerHTML = now;
};

// Set an alarm
const setAlarm = () => {
    const alarmTime = set_time.value;

    if (!alarmTime) {
        alert("Please select a valid time for the alarm");
        return;
    }

    const now = new Date();
    const alarm = new Date(now.toDateString() + " " + alarmTime);
    const remainingTime = alarm - now;

    if (remainingTime > 0) {
        alarmTimeout = setTimeout(playAlarm, remainingTime);
        set_time.disabled = true;
        addAlarm(alarmTime);
    } else {
        alert("Please select a future time for the alarm");
    }
    set_time.value = "";
};

// Play the selected alarm sound
const playAlarm = () => {
    selectedAlarmSound.play();
    set_time.disabled = false;
    stop_btn.style.display = "block";
};

// Stop the alarm when time is up
const stopAlarm = () => {
    clearTimeout(alarmTimeout);
    selectedAlarmSound.pause();
    selectedAlarmSound.currentTime = 0;
    stop_btn.style.display = "none";
    set_time.disabled = false;
};

// Show the alarm setting div
const showDiv = () => {
    set_time.disabled = false;
    setAlarmDiv.style.display = "block";
};

// Hide the alarm setting div and set the alarm
const hideDiv = () => {
    setAlarmDiv.style.display = "none";
    hideSetSoundDiv();
    setAlarm();
};

// Add the alarm to the list
const addAlarm = (alarmTime) => {
    const newAlarm = `
    <div class="alarms">${alarmTime}
    <button class="dlt_btn" onClick="deleteAlarm(this)">
    <i class="fa-solid fa-trash-can" style="color: #b20d30;"></i>
    </button>
    </div>`;
    recent_alarms.insertAdjacentHTML("beforeend", newAlarm);
    msg_div.style.display = "none";
    recent_alarms.scrollTop = recent_alarms.scrollHeight;
};


const enableSelectSound = () => {
    const alarmChecklist = `
    <input type="radio" name="alarmSound" onClick="playSound(this)" class="setSoundInput" value="0">
    <label for="sound1" class="sounds" >Sound 1</label><br>
    
    <input type="radio" name="alarmSound" onClick="playSound(this)" class="setSoundInput" value="1">
    <label for="sound2" class="sounds" >Sound 2</label><br>
    
    <input type="radio" name="alarmSound" onClick="playSound(this)" class="setSoundInput" value="2">
    <label for="sound3" class="sounds" >Sound 3</label><br>
    
    <input type="radio" name="alarmSound" onClick="playSound(this)" class="setSoundInput" value="3">
    <label for="sound4" class="sounds" >Sound 4</label><br>
    
    <input type="radio" name="alarmSound" onClick="playSound(this)" class="setSoundInput" value="4">
    <label for="sound5" class="sounds" >Sound 5</label><br>
    <button class="setSound_btn" onclick="selectAlarmSound()">Set</button>
    `;
    selectSoundDiv.innerHTML = alarmChecklist;
    selectSoundDiv.style.display = "block"; // Show the sound selection div
};

// Set the selected alarm sound
const selectAlarmSound = () => {
    const selectedInput = document.querySelector('input[name="alarmSound"]:checked');
    
    if (selectedInput) {
        // Pause and reset any playing sound
        alarmSounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });

        selectedAlarmSound = alarmSounds[selectedInput.value]; // Correctly map to array index
        console.log("Selected sound:", selectedAlarmSound);
        hideSetSoundDiv(); // Hide the sound selection div after setting
    } else {
        alert("Please select an alarm sound");
    }
};

// Play the selected sound when its radio button is clicked
const playSound = (input) => {

    // Pause any currently playing sound
    alarmSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0; // Reset the sound to the beginning
    });

    // Play the sound associated with the clicked radio button
    const soundIndex = input.value; // Get the index from the radio button value
    alarmSounds[soundIndex].play();
};


// Hide the sound selection div
const hideSetSoundDiv = () => {
    selectSoundDiv.style.display = "none";
};

// Delete the alarm
const deleteAlarm = (button) => {
    const dltAlarm = button.parentElement;
    dltAlarm.remove();
};

// Update the time every second
setInterval(currentTime, 1000);