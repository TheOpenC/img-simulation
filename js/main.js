const overlayState = document.getElementById("overlay-state");
const overlayResetDepress = document.getElementById("overlay-reset-depress");
const overlayPowerDepress = document.getElementById("overlay-power-depress");
const overlayTurboDepress = document.getElementById("overlay-turbo-depress");
const overlayTurboState = document.getElementById("overlay-turbo-state")
const loopAudio = document.getElementById('loop-audio');
const powerAudio = document.getElementById("power-audio");
const mainAudio = document.getElementById("power-main");
const floppyLed = document.getElementById("floppy-led");


let powerButtonTimer; // Timer for long press
let isLongPress = false; // Tracks if a long press occurred
let isTurboOn = false; // Tracks if turbo mode is active
let ledBlinkInterval;
let powerState = "off" // tracks the power state: "off", "green", "turbo"
let powerIsOn = false; // tracks if the power button has been pressed.

function setLCDState(state) {
    overlayState.style.opacity = 0; 
    setTimeout(() => {
        switch (state) {
            case "green":
                overlayState.src = "img/power-green.png";
                overlayState.style.opacity = 1; 
                loopAudio.play(); 
                loopAudio.playbackRate = 1; 
                startFloppyLedBlinking();
                powerState = "green";
                break;
            default: // "off"
                overlayState.src = "";
                overlayState.style.opacity = 0; // Hide overlay
                stopAllAudio();
                stopFloppyLedBlinking();
                powerState = "off";
                overlayTurboState.style.opacity = 0;
                isTurboOn = false;
                break;
        }
    }, 50); // Small delay for smooth transition
}

function startFloppyLedBlinking(){
    clearInterval(ledBlinkInterval);
    let isLedVisible = false;
    ledBlinkInterval = setInterval(() => {
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
        setLCDState("default");
        powerIsOn = false; // Long press turns off system
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
        // powerState = "green"; // Update power state
        startFloppyLedBlinking();
        powerIsOn = true;
    }
});

//Reset Button
document.getElementById("reset-button").addEventListener("mousedown", () => {
    overlayResetDepress.style.opacity = 1; // animate button press
});

document.getElementById("reset-button").addEventListener("mouseup", () => {
        overlayResetDepress.style.opacity = 0; // Hide depress overlay

        if (powerIsOn) {
            stopAllAudio();
            stopFloppyLedBlinking(); // stop led before resetting
            powerAudio.play();
            mainAudio.play();
            setLCDState("default"); // Turn the system off
            setTimeout(() => {
                setLCDState("green"); // Then turn it back on like an initial power button press
                startFloppyLedBlinking();
                // powerState ="green"
            }, 500); // Small delay to simulate a power cycle
        }
});

//Turbo Button
document.getElementById("turbo-button").addEventListener("mousedown", () =>{   
        overlayTurboDepress.style.opacity = 1; //animate the turbo button press
});

document.getElementById("turbo-button").addEventListener("mouseup", () => {
        overlayTurboDepress.style.opacity = 0; // remove the turbo depress animation
    
        if (!powerIsOn) return; // turbo only works when the system is on


        if (!isTurboOn) {
            // activate turbo
            overlayTurboState.style.opacity = 1; //show turbo dot
            loopAudio.playbackRate = 1.5; //speed up audio
            isTurboOn = true;
        } else {
            // deactivate turbo
            overlayTurboState.style.opacity = 0;
            loopAudio.playbackRate = 1;
            isTurboOn = false;
        // setLCDState("turbo"); // Turn on turbo
        
    }
    });