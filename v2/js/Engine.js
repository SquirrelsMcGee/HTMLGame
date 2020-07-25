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

        this.initialise();

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
        this.runLoop = setInterval(() => this.updateLoop(), 10);
    }

    updateLoop() {
        this.clearRenderBuffer();
        this.currentScene.update(this.time);
        this.currentScene.render();

        this.ctx.beginPath();
        this.ctx.rect(this.inputManager.mousePos.x -2, this.inputManager.mousePos.y -2, 4, 4);
        this.ctx.stroke();
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
