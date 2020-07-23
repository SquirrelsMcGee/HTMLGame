class RandomPoints extends Scene {
    constructor() {
        super();

        this.positions = [];

        this.setup();

    }

    setup() {
        for (var i = 0; i < 500; i++) {
            this.positions.push ( { x: i * 1, y: Math.floor(Math.random() * Math.floor(400)), c: ("#" + Math.floor(Math.random()*16777215).toString(16)).toUpperCase() } );
        }
    }

    render(engine, ctx) {
        //console.log("ExampleScene Rendering");
        //this.assetDB.find("square0").draw(engine, ctx);
        for (var i = 0; i < 500; i++ ) {
            //console.log(this.positions[i].x, this.positions[i].y, this.positions[i].c);
            //console.log(this.positions[i].c);
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = "" + this.positions[i].c;
            ctx.fillStyle = "" + this.positions[i].c;
            ctx.fillRect(this.positions[i].x - 10, this.positions[i].y - 10, 20, 20); // fill in the pixel at (10,10)
            ctx.stroke();
        }
    }

    update(engine, ctx, time) {
        //this.assetDB.find("square0").update(engine, ctx, time);
    }

}
