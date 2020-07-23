class EnemyObject extends DisplayableObject {
    constructor() {
        super();
        
        this.audio = new Audio('./ding.mp3');
        
        this.keys = {
            left:   Math.floor(Math.random() * 2),
            right:  Math.floor(Math.random() * 2),
            up:     Math.floor(Math.random() * 2),
            down:   Math.floor(Math.random() * 2)
        };
        
        this.clickable = true;
    }
    
    async draw() {
        super.draw();
        
        let w = this.dimensions.w; let h = this.dimensions.h;
        let x = this.position.x; let y = this.position.y;
        engine.contextData.save();
        engine.contextData.translate(x+(w/2), y+(h/2));
        engine.contextData.rotate(this.direction*Math.PI/180);
        if (this.imageData != null) engine.contextData.drawImage(this.imageData, -w/2, -h/2, w, h);
        engine.contextData.restore();
    }
    
    async update() {
        super.update();
        
        if (this.mouseDown) return;

        var changeDirection = Math.floor(Math.random() * 200) == 50;
        if (changeDirection) {
            this.keys = {
                left:   Math.floor(Math.random() * 2),
                right:  Math.floor(Math.random() * 2),
                up:     Math.floor(Math.random() * 2),
                down:   Math.floor(Math.random() * 2)
            };
        }
        var keys = this.keys;
        //console.log(changeDirection);
        
        if (keys.left)  this.velocity.vx -= this.rate;
        if (keys.right) this.velocity.vx += this.rate;
        if (keys.up)    this.velocity.vy -= this.rate;
        if (keys.down)  this.velocity.vy += this.rate;
        
        
        if (this.velocity.vx > this.maxSpeed) this.velocity.vx = this.maxSpeed;
        if (this.velocity.vx < -this.maxSpeed) this.velocity.vx = -this.maxSpeed;
        if (this.velocity.vy > this.maxSpeed) this.velocity.vy = this.maxSpeed;
        if (this.velocity.vy < -this.maxSpeed) this.velocity.vy = -this.maxSpeed;
        
        
                  
        if (this.velocity.vx > 0) this.velocity.vx -= this.rate/2;
        if (this.velocity.vx < 0) this.velocity.vx += this.rate/2;
        if (this.velocity.vy > 0) this.velocity.vy -= this.rate/2;
        if (this.velocity.vy < 0) this.velocity.vy += this.rate/2;
        
        this.velocity.vx = Math.round(this.velocity.vx * 1000) / 1000;
        this.velocity.vy = Math.round(this.velocity.vy * 1000) / 1000;
        
        // Get direction facing
        if (keys.left && !keys.right)   this.direction = -90;
        if (keys.right && !keys.left)   this.direction = 90;
        if (keys.up && !keys.down)      this.direction = 0;
        if (keys.down && !keys.up)      this.direction = 180;
        
        if (keys.up && keys.left    && !(keys.down  || keys.right)) this.direction = -45;
        if (keys.up && keys.right   && !(keys.down  || keys.left )) this.direction = 45;
        if (keys.down && keys.left  && !(keys.up    || keys.right)) this.direction = -135;
        if (keys.down && keys.right && !(keys.up    || keys.left )) this.direction = 135;
        
        if (keys.left && keys.up && keys.down && keys.right) this.direction = 0;
        
        //console.log (this.position.x + this.velocity.vx + this.dimensions.w);
        if ((this.position.x + this.velocity.vx + this.dimensions.w) > engine.canvasSize.w) { this.velocity.vx *= -1; }
        if ((this.position.y + this.velocity.vy + this.dimensions.h) > engine.canvasSize.h) { this.velocity.vy *= -1; }
        if ((this.position.x + this.velocity.vx) < 0) { this.velocity.vx *= -1; }
        if ((this.position.y + this.velocity.vy) < 0) { this.velocity.vy *= -1; }
        
        this.position.x += this.velocity.vx;
        this.position.y += this.velocity.vy;
    }
    
    click() {
        this.audio.play();
    }
    
    mouseMove(e) {
        if (!this.mouseDown) return;
        this.position.x = e.offsetX - (this.dimensions.w/2);
        this.position.y = e.offsetY - (this.dimensions.h/2);
    }
    
}