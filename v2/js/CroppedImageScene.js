class CroppedImageScene extends Scene {
    constructor(engine) {
        super(engine);


        this.image = document.createElement('img');
        this.image.src = "https://i.pinimg.com/originals/5d/25/8c/5d258cb91b51945ee93f32284e3c0744.png";
        this.imageReady = false;

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
        if (this.imageReady == false) return;

        this.deltaTime += (time - this.lastTime);
        this.lastTime = time;

        //console.log(this.deltaTime);

        if (this.deltaTime >= 100) {
            this.deltaTime = 0;

            this.imageIndex += 1;
            if (this.imageIndex >= 10) this.imageIndex = 0;
        }
        let x = 10, y = 10;
        this.engine.ctx.drawImage(this.image, this.imageIndex* 64, 0, 64, 128, x, y, 64, 128);
    }
}
