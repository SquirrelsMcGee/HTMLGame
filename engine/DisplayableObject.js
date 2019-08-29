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
    }
    
    setImage(path) {
        // Set imageData from given URL string
        return new Promise((resolve, reject) => {
            this.imageData = new Image();
            this.imageData.src = path;
            this.imageData.onload = () => resolve(this);
        })
        
    }
    
    async draw() {
        // Default draw() stub
    }
    
    async update() {
        // Default update() stub
    }
    
    
}