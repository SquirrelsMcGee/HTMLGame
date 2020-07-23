class InputManager {

    constructor() {
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
            "ArrowRight": false

        };

        // Event listeners for key up and down
        document.addEventListener('keydown', (e) => { this.keyDown(e); } );
        document.addEventListener('keyup', (e) => { this.keyUp(e); } );
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

}
