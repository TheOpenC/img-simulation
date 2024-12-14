const overlayState = document.getElementById("overlay-state");

        let powerButtonTimer; // Timer for long press
        let isLongPress = false; // Tracks if a long press occurred
        let isTurboOn = false; // Tracks if turbo mode is active

        function setLCDState(state) {
            overlayState.style.opacity = 0; // Reset opacity for transition
            setTimeout(() => {
                switch (state) {
                    case "green":
                        overlayState.src = "img/power-green.png";
                        overlayState.style.opacity = 1; // Show green overlay
                        break;
                    case "turbo":
                        overlayState.src = "img/power-turbo.png";
                        overlayState.style.opacity = 1; // Show turbo overlay
                        break;
                    default: // "off"
                        overlayState.src = "";
                        overlayState.style.opacity = 0; // Hide overlay
                }
            }, 50); // Small delay for smooth transition
        }

        // Handle Power Button
        document.getElementById("power-button").addEventListener("mousedown", () => {
            isLongPress = false; // Reset long press flag
            powerButtonTimer = setTimeout(() => {
                isLongPress = true; // Mark as long press
                setLCDState("off"); // Long press turns off system
            }, 2000); // 2 seconds for long press
        });

        document.getElementById("power-button").addEventListener("mouseup", () => {
            clearTimeout(powerButtonTimer); // Cancel timer if mouse is released
            if (!isLongPress) {
                setLCDState("green"); // Short press toggles to green
            }
        });

        // Handle Reset Button
        document.getElementById("reset-button").addEventListener("mousedown", () => {
          overlayResetDepress.style.opacity = 1; // Show reset depress image
      });


      document.getElementById("reset-button").addEventListener("mouseup", () => {
        overlayResetDepress.style.opacity = 0; // Hide reset depress image
        setLCDState("off"); // Turn the system off
        setTimeout(() => {
            setLCDState("green"); // Then turn it back on like an initial power button press
        }, 500); // Small delay to simulate a power cycle
    });

        // Handle Turbo Button
        document.getElementById("turbo-button").addEventListener("click", () => {
            if (isTurboOn) {
                setLCDState("green"); // Turn off turbo, back to green
                isTurboOn = false;
            } else {
                setLCDState("turbo"); // Turn on turbo
                isTurboOn = true;
            }
        });