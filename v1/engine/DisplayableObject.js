class DisplayableObject {
    constructor() {
        this.imageData = null;
        this.dimensions = {width: 0, height: 0};
        this.position = {x: 0, y: 0};
        this.velocity = {vx: 0, vy: 0};
        this.maxSpeed = 1;
        this.rate = 0.01;
        this.style = {};
        this.direction = 0;
        
        this.clickable = false;
        this.mouseOver = false;
        this.mouseDown = false;
    }
    
    setImage(path) {
        // Set imageData from given URL string
        return new Promise((resolve, reject) => {
            this.imageData = new Image();
            this.imageData.src = path;
            this.imageData.onload = () => resolve(this);
            this.imageData.setAttribute("crossOrigin", "anonymous");
        })
        
    }
    
    async draw() {
        // Default draw() stub
    }
    
    async update() {
        // Default update() stub
    }
    
    isPointInside(x, y) {
        // Checks to see if a given x,y point is within the bounds of the object
        return (   x >= this.position.x 
                && x <= this.position.x + this.dimensions.w 
                && y >= this.position.y 
                && y <= this.position.y + this.dimensions.h);
    }
    
    mouseMove(e) {
        
    }
    
    click() {
        
    }
}