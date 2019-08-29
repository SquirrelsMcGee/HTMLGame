class DisplayableObject {
    constructor() {
        this.imageData = null;
        this.dimensions = {width: 0, height: 0};
        this.position = {x: 0, y: 0};
        this.velocity = {vx: 0, vy: 0};
        this.maxSpeed = 1;
        this.rate = 1;
        this.style = {};
        this.direction = 0;
    }
    
    setImage(path) {
        return new Promise((resolve, reject) => {
            this.imageData = new Image();
            this.imageData.src = path;
            this.imageData.onload = () => resolve(this);
        })
        
    }
    
    draw() {
        let w = 100; let h = 100;
        let x = this.position.x; let y = this.position.y;
        engine.contextData.save();
        engine.contextData.translate(x+(w/2), y+(h/2));
        engine.contextData.rotate(this.direction*Math.PI/180);
        engine.contextData.drawImage(this.imageData, -w/2, -h/2, w, h);
        engine.contextData.restore();
    }
    
    update() {
        
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
        
        
        // No keys being pressed, decrease velocity
        if (! (keys.left || keys.right )) {            
            if (this.velocity.vx > 0) this.velocity.vx -= this.rate;
            if (this.velocity.vx < 0) this.velocity.vx += this.rate;
        }
        
        if (! (keys.up || keys.down)) {
            if (this.velocity.vy > 0) this.velocity.vy -= this.rate;
            if (this.velocity.vy < 0) this.velocity.vy += this.rate;
        }
        
        this.velocity.vx = Math.round(this.velocity.vx * 100) / 100;
        this.velocity.vy = Math.round(this.velocity.vy * 100) / 100;
        
        // Get direction facing
        if (keys.left)  this.direction = -90;
        if (keys.right) this.direction = 90;
        if (keys.up)    this.direction = 0;
        if (keys.down)  this.direction = 180;
        
        if (keys.up && keys.left)       this.direction = -45;
        if (keys.up && keys.right)      this.direction = 45;
        if (keys.down && keys.left)     this.direction = -135;
        if (keys.down && keys.right)    this.direction = 135;
        
    }
    
    
}