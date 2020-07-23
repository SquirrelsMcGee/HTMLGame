class SpaceshipObject extends DisplayableObject {
    constructor() {
        super();
        this.clickable = false;
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
        
        var keys = game_data._arrowKeys;
        //console.log(this.position);
        
        if (keys.left)  this.velocity.vx -= this.rate;
        if (keys.right) this.velocity.vx += this.rate;
        if (keys.up)    this.velocity.vy -= this.rate;
        if (keys.down)  this.velocity.vy += this.rate;
        
        this.position.x += this.velocity.vx;
        this.position.y += this.velocity.vy;
        
        if (this.velocity.vx > this.maxSpeed) this.velocity.vx = this.maxSpeed;
        if (this.velocity.vx < -this.maxSpeed) this.velocity.vx = -this.maxSpeed;
        if (this.velocity.vy > this.maxSpeed) this.velocity.vy = this.maxSpeed;
        if (this.velocity.vy < -this.maxSpeed) this.velocity.vy = -this.maxSpeed;

        
        // Decrease velocity over time
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
    }
    
    
}