class SpriteScene extends Scene {
    constructor(engine) {
        super(engine);

        this.name = "Sprite Scene"

        this.image = document.createElement('img');
        this.image.src = "./img/sprite_walking.png";
        this.imageReady = false;


        this.spriteSheet = new SpriteSheet(this.engine, "./img/sprite_walking.png", {width: 64, height: 128}, {x: 9, y: 1});
        this.spriteSheet.invertAxis = { x: false, y: false };

        this.deltaTime = 0;
        this.lastTime = 0;

        this.image.onload = () => {
            this.imageReady = true;
        }

        this.imageIndex = 0;
    }
    render() {

    }

    update(time) {
        //if (this.imageReady == false) return;
        if (this.spriteSheet.ready == false) return;

        this.deltaTime += (time - this.lastTime);
        this.lastTime = time;

        if (this.deltaTime >= 100) {
            this.deltaTime = 0;
            this.spriteSheet.nextHorizontal();
            //this.spriteSheet.nextVertical();
        }

        this.spriteSheet.draw({x:10, y:10});

        this.engine.ctx.drawImage(this.image, 10, 266);

        /*
        if (this.deltaTime >= 100) {
            this.deltaTime = 0;

            this.imageIndex += 1;
            if (this.imageIndex >= 9) this.imageIndex = 0;
        }


        let x = 10, y = 10;
        this.engine.ctx.drawImage(this.image, this.imageIndex* 64, 0, 64, 128, x, y, 64, 128);

        */
    }
}
