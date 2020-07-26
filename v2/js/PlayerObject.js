class PlayerObject extends GameObject {
    constructor(engine) {

        super(engine);

        this.velocity = { x: 0, y: 0 };

        this.size = { width: 50, height: 50};
        this.color = "#000000";
        this.lineWidth = "5";

        this.isGrounded = false;

        this.name = "PlayerObject";

        //this.active = false;

        this.isHover = false;
        this.isClicked = false;

        this.addCollider();

        return this;
    }

    addCollider() {
        this.collider = new RectCollider(this, this.size);
    }

    setSize(w, h) {
        this.size = { width: w, height: h };
    }

    update(time) {

        // Apply gravity
        this.velocity.y += -0.5;

        // Get Inputs
        if (this.engine.inputManager.getInput("Space") && this.isGrounded) {
            this.velocity.y = 10.0;
            this.isGrounded = false;
        }

        if (this.engine.inputManager.getInput("KeyA")) {
            this.velocity.x -= 0.2;
        }
        if (this.engine.inputManager.getInput("KeyD")) {
            this.velocity.x += 0.2;
        }

        this.isHover = this.inBounds(this.engine.inputManager.mousePos);

        if (this.isHover) {
            this.color = "#FF0000";
            if (this.engine.inputManager.activeInputs["Mouse0"]) {
                this.isClicked = true;
                console.log("clicky clicky");
            }
            else {
                this.isClicked = false;
            }
        } else {
            this.color = "#000000";
            //this.isClicked = false;
        }

        if (this.invertX != -1) {
            if (Collider.detectCollision(this.collider, this.engine.currentScene.gameObjects[1].collider)) {
                this.color = "#00ffff";
                console.log("Colliding with arbitrary object");
            }
        }


        if (this.isClicked) {
            this.transform.position.x = this.engine.inputManager.mousePos.x - 25;
            this.transform.position.y = this.engine.inputManager.mousePos.y - 25;
            this.velocity.y = 0;
            //this.velocity.x = this.velocity.y = -this.engine.inputManager.mouseVelocity.y * 3;
            //this.velocity.x = this.velocity.x = this.engine.inputManager.mouseVelocity.x * 3;
            return;
        }
        // Clamp velocity to maximal/minimal values
        this.clampVelocity();

        // Apply velocity to object
        this.translate(this.velocity);

        // Velocity Decay Factors
        if (this.velocity.x > 0) this.velocity.x -= 0.075;
        if (this.velocity.x < 0) this.velocity.x += 0.075;

        // Round velocity
        this.precisionRounding();

        // Apply screen bounds checks
        this.clampBoundary();

        if (this.isGrounded) {
            if (this.velocity.x > 0) this.velocity.x -= 0.075;
            if (this.velocity.x < 0) this.velocity.x += 0.075;
        }
    }

    inBounds(vector) {
        let minx = (vector.x >= this.transform.position.x);
        let maxx = (vector.x <= this.transform.position.x + this.size.width);
        let miny = (vector.y >= this.transform.position.y);
        let maxy = (vector.y <= this.transform.position.y + this.size.height);

        let bx = minx && maxx;
        let by = miny && maxy;

        return bx && by;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(this.transform.position.x, this.transform.position.y, this.size.width, this.size.height);
        this.ctx.stroke();

        this.ctx.strokeStyle = "#000000";
    }


    clampVelocity() {
        if (this.velocity.x > 3) this.velocity.x = 3;
        if (this.velocity.x < -3) this.velocity.x = -3;
    }

    clampBoundary() {
        // Top
        if (this.transform.position.y < 0) {
            this.velocity.y = 0;
            //this.pos.y = 0;
        }
        // Bottom
        if (this.transform.position.y > this.ctx.canvas.height - this.size.height) {
            if (this.velocity.x != 0){
                this.velocity.y = 0;
            }
            else {
                this.velocity.y = 0;
            }

            this.transform.position.y = this.ctx.canvas.height - this.size.height;
            this.isGrounded = true;
        }
    }

    precisionRounding() {

        if (Math.abs(this.velocity.x) <= 0.1) this.velocity.x = 0;
        if (Math.abs(this.velocity.y) <= 0.1) this.velocity.y = 0;
    }

    logHistory(time) {
        this.deltaTime += time;
        if (this.deltaTime > 100) { // ms
            if (Math.abs(this.velocity.x) >= 0.01) {
                this.deltaTime = 0;
                this.prevPositions.push(Object.assign({}, this.pos));
            }
        }
    }
}
