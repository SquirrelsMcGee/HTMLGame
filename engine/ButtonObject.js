class ButtonObject extends DisplayableObject {
    constructor() {
        super();
        
        this.stroke = "blue";
        this.highlightStroke = "red";
        this.audio = new Audio('./ding.mp3');
        this.counter = 0;
        
        this.clickable = true;
    }
    
    async draw(stroke) {
        super.draw();
        
        engine.contextData.save();
        engine.contextData.beginPath();
        engine.contextData.fillStyle = "blue";
        engine.contextData.strokeStyle = this.mouseOver ? this.highlightStroke : this.stroke;
        engine.contextData.lineWidth = 5;
        engine.contextData.rect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);
        engine.contextData.stroke();
        engine.contextData.fill();
        engine.contextData.restore();
    }
    
    async update() {
        super.update();
        if (this.mouseOver) {
            engine.canvasData.style.cursor = "pointer";
        } else {
            engine.canvasData.style.cursor = "auto";
        }
    }
    
    click() {
        //setTimeout("alert('counter = " + (this.counter++) + "');", 1);
        //this.audio.play();
        
        let c = engine.canvasData;
        let d = c.toDataURL("image/png");
        let w = window.open('about:blank','image from canvas');
        w.document.write("<img src='"+d+"' alt='from canvas'/>");
    }    
}