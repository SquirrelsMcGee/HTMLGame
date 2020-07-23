class Engine {

    constructor(canvas) {

        this.self = this;
        this.inputManager = new InputManager();
        this.state = EngineStates.STOPPED;
        this.runLoop = null;
        this.currentScene = null;

        this._canvas = canvas;
        this.canvas.width = 500;
        this.canvas.height = 500;

        this.startTime = Date.now();
    }

    get ctx() {
        return canvas.getContext("2d");
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
        this.currentScene.update(this.self, this.ctx, this.time);
        this.currentScene.render(this.self, this.ctx);
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
