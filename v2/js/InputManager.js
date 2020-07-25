class InputManager {

    constructor(engine) {

        // Input map <Name, state>
        this.activeInputs = {
            "KeyQ": false,
            "KeyW": false,
            "KeyE": false,
            "KeyR": false,
            "KeyT": false,
            "KeyY": false,
            "KeyU": false,
            "KeyI": false,
            "KeyO": false,
            "KeyP": false,
            "KeyA": false,
            "KeyS": false,
            "KeyD": false,
            "KeyF": false,
            "KeyG": false,
            "KeyH": false,
            "KeyJ": false,
            "KeyK": false,
            "KeyL": false,
            "KeyZ": false,
            "KeyX": false,
            "KeyC": false,
            "KeyV": false,
            "KeyB": false,
            "KeyN": false,
            "KeyM": false,

            "Digit1": false,
            "Digit2": false,
            "Digit3": false,
            "Digit4": false,
            "Digit5": false,
            "Digit6": false,
            "Digit7": false,
            "Digit8": false,
            "Digit9": false,
            "Digit0": false,

            "Space": false,

            "ArrowUp": false,
            "ArrowDown": false,
            "ArrowLeft": false,
            "ArrowRight": false,

            "Mouse0": false, // Left mouse down
            "Mouse1": false, // Middle mouse down
            "Mouse2": false, // Right mouse down
            "Mouse3": false, // Browser-back mouse down
            "Mouse4": false, // Browser-forward mouse down

            // Click flags only active immediately after the mouse button goes up
            "MouseClick0": false,   // Left mouse click (Mouse up)
            "MouseClick1": false,   // Middle mouse click (Mouse up)
            "MouseClick2": false   // Right mouse click (Mouse up)
        };

        this.engine = engine;

        this.mousePos = { x: 0, y: 0 };

        // Event Listeners for Input mapping
        document.addEventListener('keydown', (e) => { this.keyDown(e); } );
        document.addEventListener('keyup', (e) => { this.keyUp(e); } );
        document.addEventListener('mousemove', (e) => { this.mouseMove(e); }, false);
        document.addEventListener('mousedown', (e) => { this.mouseDown(e); }, false);
        document.addEventListener('mouseup', (e) => { this.mouseUp(e); }, false);

        // Disable context menu for canvas
        document.addEventListener("contextmenu", (e) => { this.contextMenu(e); }, false);
    }

    getInput(code) {
        return this.activeInputs[code];
    }

    keyDown(e) {
        this.activeInputs[e.code] = true;
    }

    keyUp(e) {
        this.activeInputs[e.code] = false;
    }

    mouseMove(e) {
        // Check position is within canvas bounds
        if (e.target != this.engine.canvas) {
            // Not over canvas
            //console.log(e.target);
            return;
        }

        // Set mouse position
        this.mousePos.x = e.offsetX;
        this.mousePos.y = e.offsetY;
    }

    mouseDown(e) {
        if (e.target == this.engine.canvas) {
            e.preventDefault();
        }
        // Set mouse down
        this.activeInputs["Mouse" + e.button] = true;

        // Debug
        //console.log("mouseDown: Mouse" + e.button);
    }

    mouseUp(e) {
        if (e.target == this.engine.canvas) {
            e.preventDefault();
        }

        // Set mouse up
        this.activeInputs["Mouse" + e.button] = false;

        this.activeInputs["MouseClick" + e.button] = true;

        setTimeout(() => { this.activeInputs["MouseClick" + e.button] = false; }, this.engine.tickRate);

        // Debug
        //console.log("mouseUp: Mouse" + e.button);
    }

    // Prevent context menu appearing on canvas
    contextMenu(e) {
        if (e.target == this.engine.canvas) {
            e.preventDefault();
        }
    }

}
