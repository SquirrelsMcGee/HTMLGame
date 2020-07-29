class SpriteScene extends Scene {
    constructor(engine) {
        super(engine);

        this.name = "Sprite Scene"

        this.spriteSheet = new SpriteSheet(this.engine, "./img/sprite_walking.png", {width: 64, height: 128}, {x: 9, y: 1});
        this.spriteSheet.invertAxis = { x: false, y: false };

        this.deltaTime = 0;
        this.lastTime = 0;
    }
    render() {

    }

    update(time) {

        // Wait for the sprite sheet to load
        if (this.spriteSheet.ready == false) return;
        // Used to limit the animation rate to 100ms/frame
        this.deltaTime += (time - this.lastTime);
        this.lastTime = time;

        // Get the next animation frame every 100ms
        if (this.deltaTime >= 100) {
            this.deltaTime = 0;
            this.spriteSheet.nextHorizontal();
        }

        // Draw the sprite at coordinates (10, 10)
        this.spriteSheet.draw({x:10, y:10});

        // Draw the entire sprite sheet for reference
        this.engine.ctx.drawImage(this.spriteSheet.image, 10, 266);

    }
}
