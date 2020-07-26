class Engine {

    constructor(canvas) {

        this.state = EngineStates.STOPPED;
        this.runLoop = null;
        this.currentScene = null;

        this._canvas = canvas;
        this.canvas.width = 1000;
        this.canvas.height = 500;

        this.inputManager = null;

        this.startTime = Date.now();

        this.tickRate = 10;

        this.initialise();

        //this.dataBox = null;

    }

    get dataBox() {
        return document.getElementById("dataField");
    }

    initialise() {
        this.inputManager = new InputManager(this);
    }

    get ctx() {
        return this.canvas.getContext("2d");
    }

    get canvas() {
        return this._canvas();
    }

    get time() {
        return Date.now() - this.startTime;
    }

    setScene(scene) {
        this.currentScene = scene;
    }

    start() {
        this.state = EngineStates.RUNNING;
        this.runLoop = setInterval(() => this.updateLoop(), this.tickRate);
    }

    updateLoop() {
        this.clearRenderBuffer();
        this.currentScene.update(this.time);
        this.currentScene.render();
        this.currentScene.drawCursor();

        //this.dataBox.innerHTML = "x:" + this.inputManager.mouseVelocity.y +" , y: " + this.inputManager.mouseVelocity.y;
    }

    clearRenderBuffer() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        clearInterval(this.runLoop);
    }

    pause() {

    }

    unpause() {

    }

    resize() {

    }
}

/*
    Engine state enum
*/
const EngineStates = {
    STOPPED: 0,
    RUNNING: 1,
    PAUSED: 2
};
Object.freeze(EngineStates);
