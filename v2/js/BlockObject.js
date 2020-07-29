class BlockObject extends GameObject {
    constructor(engine) {
        super(engine);

        this.color = "#ffddcc";

        this.name = "BlockObject";

        this.collider = new RectCollider(this, { width: 50, height: 50 });
    }

    update(time) {
        // Do nothing really
    }

    draw() {
        this.collider.draw();
    }
}
