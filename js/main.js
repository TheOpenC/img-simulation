const overlayState = document.getElementById("overlay-state");
const overlayResetDepress = document.getElementById("overlay-reset-depress");
const overlayPowerDepress = document.getElementById("overlay-power-depress");
const loopAudio = document.getElementById('loop-audio');
const powerAudio = document.getElementById("power-audio");
const mainAudio = document.getElementById("power-main");
const floppyLed = document.getElementById("floppy-led");


let powerButtonTimer; // Timer for long press
let isLongPress = false; // Tracks if a long press occurred
let isTurboOn = false; // Tracks if turbo mode is active
let ledBlinkInterval;

function setLCDState(state) {
    overlayState.style.opacity = 0; // Reset opacity for transition
    setTimeout(() => {
        switch (state) {
            case "green":
                overlayState.src = "img/power-green.png";
                overlayState.style.opacity = 1; // Show green overlay
                loopAudio.play(); // play normal loading audio
                loopAudio.playbackRate = 1; //normal speed
                startFloppyLedBlinking();
                break;
            case "turbo":
                if(powerAudio.play() && mainAudio.play()){
                    powerAudio.playbackRate = 2.5;
                    mainAudio.playbackRate = 2.5;
                }
                overlayState.src = "img/power-turbo.png";
                overlayState.style.opacity = 1; // Show turbo overlay
                loopAudio.play(); // play loading audio
                loopAudio.playbackRate = 1 // turbo mode
                break;
            default: // "off"
                overlayState.src = "";
                overlayState.style.opacity = 0; // Hide overlay
                stopAllAudio();
                stopFloppyLedBlinking();
        }
    }, 50); // Small delay for smooth transition
}

function startFloppyLedBlicking(){
    let isLedVisible = false;
    clearInterval(ledBlinkInterval);
    ledBlickInterval = setInterval(() => {
        isLedVisible = !isLedVisible;
        floppyLed.style.opacity = isLedVisible ? 1 : 0;
    }, 200); // speed of the blink   
}

function stopFloppyLedBlinking(){
    clearInterval(ledBlinkInterval);
    floppyLed.style.opacity = 0; // hide the led image
}

function stopAllAudio() {
    powerAudio.pause();
    powerAudio.currentTime = 0;
    mainAudio.pause();
    mainAudio.currentTime = 0;
    loopAudio.pause();
    loopAudio.currentTime = 0;
}

//Power Button
document.getElementById("power-button").addEventListener("mousedown", () => {
    overlayPowerDepress.style.opacity = 1; // show depressed overlay
    isLongPress = false; // Reset long press flag
    powerButtonTimer = setTimeout(() => {
        isLongPress = true; // Mark as long press
        setLCDState("off"); // Long press turns off system
    }, 1500); // 2 seconds for long press
});

document.getElementById("power-button").addEventListener("mouseup", () => {
    overlayPowerDepress.style.opacity = 0; // Hide depressed overlay
    clearTimeout(powerButtonTimer); // Cancel timer if mouse is released
    if (!isLongPress) {
        stopAllAudio(); //reset everthying to start from 0
        powerAudio.play(); //play power-on audio
        mainAudio.play();
        setLCDState("green"); // Short press toggles to green
        startFloppyLedBlinking();
    }
});

//Reset Button
document.getElementById("reset-button").addEventListener("mousedown", () => {
    overlayResetDepress.style.opacity = 1; // Show reset depress image
});

document.getElementById("reset-button").addEventListener("mouseup", () => {
    overlayResetDepress.style.opacity = 0; // Hide reset depress image
    stopAllAudio();
    stopFloppyLedBlinking(); // stop led before resetting
    powerAudio.play();
    setLCDState("off"); // Turn the system off
    setTimeout(() => {
        setLCDState("green"); // Then turn it back on like an initial power button press
        startFloppyLedBlinking();
    }, 500); // Small delay to simulate a power cycle
});

//Turbo Button
document.getElementById("turbo-button").addEventListener("click", () => {
    if (isTurboOn) {
        setLCDState("green"); // Turn off turbo, back to green
        isTurboOn = false;
    } else {
        setLCDState("turbo"); // Turn on turbo
        isTurboOn = true;
    }
});