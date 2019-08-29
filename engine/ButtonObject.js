class ButtonObject extends DisplayableObject {
    constructor() {
        super();
        this.clickable = true;
        this.stroke = "blue";
        this.highlightStroke = "red";
        this.hover = false;
        this.audio = new Audio('./ding.mp3');
        this.counter = 0;
    }
    
    async draw(stroke) {
        super.draw();
        
        engine.contextData.save();
        engine.contextData.beginPath();
        engine.contextData.fillStyle = "blue";
        engine.contextData.strokeStyle = this.hover ? this.highlightStroke : this.stroke;
        engine.contextData.lineWidth = 5;
        engine.contextData.rect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);
        engine.contextData.stroke();
        engine.contextData.fill();
        engine.contextData.restore();
    }
    
    async update() {
        super.update();
        if (this.hover) {
            engine.canvasData.style.cursor = "pointer";
        } else {
            engine.canvasData.style.cursor = "auto";
        }
    }
    
    click() {
        setTimeout("alert('counter = " + (this.counter++) + "');", 1);
        this.audio.play();
    }
    
    isPointInside(x, y) {
        return (   x >= this.position.x 
                && x <= this.position.x + this.dimensions.w 
                && y >= this.position.y 
                && y <= this.position.y + this.dimensions.h);
    }
    
}