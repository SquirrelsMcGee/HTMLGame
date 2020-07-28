class RandomPoints extends Scene {
    constructor(engine) {
        super(engine);

        this.positions = [];

        this.setup();

    }

    setup() {
        for (var i = 0; i < 500; i++) {
            this.positions.push ( { x: i * 1, y: Math.floor(Math.random() * Math.floor(400)), c: ("#" + Math.floor(Math.random()*16777215).toString(16)).toUpperCase() } );
        }
    }

    render() {
        for (var i = 0; i < 500; i++ ) {
            this.engine.ctx.beginPath();
            this.engine.ctx.lineWidth = 10;
            this.engine.ctx.strokeStyle = "" + this.positions[i].c;
            this.engine.ctx.fillStyle = "" + this.positions[i].c;
            this.engine.ctx.fillRect(this.positions[i].x - 10, this.positions[i].y - 10, 20, 20); // fill in the pixel at (10,10)
            this.engine.ctx.stroke();
        }
    }

    update(time) {

    }
}
