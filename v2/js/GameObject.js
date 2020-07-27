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

        // temporary
        this.invertX = 1;

        this.active = true;

        this.collider = null;

        this.colliding = false;
        this.collidingWith = [];

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
        this.transform.position.x += vector.x * this.invertX;
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

    detectCollisions() {
        // Loops through all game objects, finding all objects that are colliding with the attached collider
        // Check that this object has a collider
        if (this.collider != null) {

            let collisionDetect = false;
            let otherCollider = null;

            this.colliding = false;
            this.collidingWith = []; // Reset list of colliding objects

            // Loop through all game objects in scene
            for (let otherGameObject of this.engine.currentScene.gameObjects) {

                // Skip if the other GameObject is disabled
                if (otherGameObject.active == false) continue;

                // Get the other collider
                otherCollider = otherGameObject.collider;
                // Check that the other collider exists, and make sure it's not the same as the attached collider
                if (otherCollider != null && this.collider != otherCollider) {

                    // Set the colliding flag (true if collision, false otherwise)
                    collisionDetect = Collider.detectCollision(this.collider, otherCollider);

                    // If this collider and the other collider are colliding, add the other gameObject to the list of colliding objects
                    if (collisionDetect) {
                        this.colliding = true;
                        this.collidingWith.push(otherGameObject);
                    }
                }
            }
        }

        // Return the current colliding flag
        return this.colliding;
    }
}
