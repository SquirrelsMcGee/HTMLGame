class GameObject {

    constructor(engine) {

        this.engine = engine;
        //this.ctx = this.engine.ctx;

        /* Transformation vectors */
        this.transform = {
            position: {x: 0, y: 0},
            scale: {x: 0, y: 0},
            pivot: {x: 0, y: 0},
            rotation: 0
        }

        this.active = true;

        this.name = "New GameObject";
    }

    get ctx() {
        return this.engine.ctx;
    }

    translate(vector) {

        // Assert argument validity
        if (vector == undefined)
            throw `GameObject.${this.name}: Cannot translate by undefined vector`;
        if (vector.x == undefined || vector.y == undefined)
            throw `GameObject.${this.name}: Cannot translate by malformed vector, ${vector}`;

        // Translate coordinates
        this.transform.position.x += vector.x;
        this.transform.position.y -= vector.y;
    }

    rotate(angle) {
        // Assert argument validity
        if (angle == undefined)
            throw `GameObject.${this.name}: Cannot rotate by undefined angle`;
        if (typeof(angle) != "number")
            throw `GameObject.${this.name}: Cannot rotate by non-number value, ${angle}`;

        // Rotate object
    }

    draw() {
        // this.engine
        // this.ctx
    }

    update(time) {
        // this.engine
        // this.ctx
    }
}
