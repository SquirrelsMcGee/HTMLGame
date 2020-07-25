class OldSquare {
    constructor() {
        this.pos = { x: 50, y: 50 };
        this.velocity = { x: 0, y: 0 };
        this.initialPos = Object.assign({}, this.pos);
        this.size = { width: 50, height: 50};
        this.color = "#000000";
        this.lineWidth = "5";

        this.prevPositions = [];

        this.isGrounded = false;

        this.deltaTime = 0;

        return this;
    }

    setSize(w, h) {
        this.size = { width: w, height: h };
    }

    draw(engine, ctx) {
        //console.log("Square being drawn");

        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        //ctx.rect(50, 50, 10, 10);
        ctx.stroke();


        // Draw history when object stops moving in x direction
        if (Math.abs(this.velocity.x) < 0.01) {
            for (let prev of this.prevPositions) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = this.color;
                ctx.fillRect(prev.x,prev.y,2,2); // fill in the pixel at (10,10)
                ctx.stroke();
            }
        }
    }

    update(engine, ctx, time) {
        //console.log(this.pos.x, this.initialPos.x);
        // Math.sin(time / speed) * amplitude
        //this.pos.x = this.initialPos.x + (Math.sin(time / 1000) * 50) ;

        //this.logHistory(time);

        // Apply gravity
        this.velocity.y += -0.5;

        /*
        let randomJump = Math.floor(Math.random() * Math.floor(20)) == 0;
        if (randomJump && (this.velocity.x == 0) && this.isGrounded) {
            this.velocity.y += 10.0;
            this.isGrounded = false;
            console.log("jumping");
        }
        */

        // Get Inputs
        if (engine.inputManager.getInput("Space")) {
            if (this.isGrounded) {
                this.velocity.y += 10.0;
                this.isGrounded = false;
                console.log("jumping");
            }
        }

        if (engine.inputManager.getInput("KeyA")) {
            this.velocity.x -= 0.2;
        }
        if (engine.inputManager.getInput("KeyD")) {
            this.velocity.x += 0.2;
        }

        //console.log (this.velocity.x, this.velocity.y);

        this.clampVelocity();

        // Apply velocity to object
        this.pos.x += this.velocity.x;
        this.pos.y -= this.velocity.y; // Velocity in y direction is inverted due to top->bottom rendering

        // Velocity Decay Factors
        if (this.velocity.x > 0) this.velocity.x -= 0.075;
        if (this.velocity.x < 0) this.velocity.x += 0.075;
        //if (this.velocity.y > 0) this.velocity.y -= this.rate/2;
        //if (this.velocity.y < 0) this.velocity.y += this.rate/2;

        this.precisionRounding();

        // Apply screen bounds checks
        this.clampBoundary(ctx);
    }


    clampVelocity() {
        if (this.velocity.x > 3) this.velocity.x = 3;
        if (this.velocity.x < -3) this.velocity.x = -3;
    }

    clampBoundary(ctx) {
        // Top
        if (this.pos.y < 0) {
            this.velocity.y = 0;
            //this.pos.y = 0;
        }
        // Bottom
        if (this.pos.y > ctx.canvas.height - this.size.height) {
            if (this.velocity.x != 0) this.velocity.y = 0;
            else this.velocity.y = 0;
            this.pos.y = ctx.canvas.height - this.size.height;
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
