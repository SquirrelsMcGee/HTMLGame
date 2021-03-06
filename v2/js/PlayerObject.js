class PlayerObject extends GameObject {
    constructor(engine) {

        super(engine);

        this.velocity = { x: 0, y: 0 };

        this.size = { width: 64, height: 128};
        this.color = "#000000";
        this.lineWidth = "5";

        this.isGrounded = false;

        this.name = "PlayerObject";

        //this.active = false;

        this.isHover = false;
        this.isClicked = false;

        this.spriteSheet = new SpriteSheet(this.engine, "./img/sprite_walking.png", {width: 64, height: 128}, {x: 9, y: 1});
        this.spriteSheet.invertAxis = { x: false, y: false };

        this.deltaTime = 0;
        this.lastTime = 0;

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

        // Wait for the sprite sheet to load
        if (this.spriteSheet.ready == false) return;

        // Used to limit the animation rate to 100ms/frame
        this.deltaTime += (time - this.lastTime);
        this.lastTime = time;

        if (this.deltaTime >= 100) {
            this.deltaTime = 0;
            this.spriteSheet.nextHorizontal();
        }

        // Apply gravity
        this.velocity.y += -0.5;

        // Get Inputs
        if (this.engine.inputManager.getInput("Space") && this.isGrounded) {
            this.velocity.y = 13.0;
            this.isGrounded = false;
        }

        if (this.engine.inputManager.getInput("KeyA")) {
            this.velocity.x -= 0.2;
            this.spriteSheet.invertAxis.x = true;
        }
        if (this.engine.inputManager.getInput("KeyD")) {
            this.velocity.x += 0.2;
            this.spriteSheet.invertAxis.x = false;
        }

        if (this.engine.inputManager.getInput("KeyA") == false && this.engine.inputManager.getInput("KeyD") == false) {
            this.spriteSheet.sheetIndex.x = 0;
        }

        this.isHover = this.inBounds(this.engine.inputManager.mousePos);

        if (this.isHover) {
            this.color = "#FF0000";
            if (this.engine.inputManager.activeInputs["Mouse0"]) {
                this.isClicked = true;
                //console.log("clicky clicky");
            }
            else {
                this.isClicked = false;
            }
        } else {
            this.color = "#000000";
            //this.isClicked = false;
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

        // Check collisions
        if (this.invertX != -1) {
            if (this.detectCollisions()) {
                for (let gameObj of this.collidingWith) {

                    this.translate({x: -(this.velocity.x), y: -this.velocity.y});

                    //go.active = false;

                    // To the left of the other collider
                    let left = this.transform.position.x + this.collider.size.width <= gameObj.transform.position.x; // Left side
                    let right = this.transform.position.x > gameObj.transform.position.x;
                    let below = this.transform.position.y > gameObj.transform.position.y + (gameObj.collider.size.height * 0.5);
                    let above = this.transform.position.y + this.collider.size.height < gameObj.transform.position.y;


                    if (above) {
                        this.velocity.y = 0;
                        this.transform.position.y = gameObj.transform.position.y - this.collider.size.height - 0.5;
                    } else {
                        if (below) {
                            this.velocity.y = 0;
                            this.transform.position.y = gameObj.transform.position.y + gameObj.collider.size.height + 0.5;
                        }
                        if (!below) {
                            if (left) {
                                this.transform.position.x = gameObj.transform.position.x - this.collider.size.width - 0.5;
                            }
                            if (right) {
                                this.transform.position.x = gameObj.transform.position.x + gameObj.collider.size.width + 0.5;
                            }
                        }
                    }



                    /*
                    if (below) {
                        this.velocity.y = 0;
                        this.transform.position.y = gameObj.transform.position.y + gameObj.collider.size.height + 0.5;
                    }

                    console.log(above, below);
                    if (left || right) {
                        this.translate({x: -(this.velocity.x), y: 0});
                    }
                    */
                    if (above) {
                        this.isGrounded = true; // If standing on other collider
                        this.translate( {x: this.velocity.x, y: 0} );
                    }
                    if (!above) this.isGrounded = false;

                }
                //console.log(this.collidingWith.map( go => go.name));
                //this.color = "#00ffff";
            } else {
                this.isGrounded = false;
            }
        }


        // Apply velocity to object
        if (this.freeze != true) this.translate(this.velocity);

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

            this.velocity.y = 0;
        }

        if (this.freezeAxis.y == false) {
            //console.log(this.isGrounded, this.velocity.y);
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

        this.spriteSheet.draw({x:this.transform.position.x, y: this.transform.position.y});

        //this.collider.draw();

        /*
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(this.transform.position.x, this.transform.position.y, this.size.width, this.size.height);
        this.ctx.stroke();
        */
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
        if (this.transform.position.y >= this.ctx.canvas.height - this.size.height) {
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
