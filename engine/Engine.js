class Engine {
    constructor() {
        this.canvasData = document.getElementById("game_canvas");
        this.contextData = document.getElementById("game_canvas").getContext("2d");
        this.canvasSize = {w: 1, h: 1};
        this.objects = [];
        this.backgroundColor = "#ffffff";
        this.runLoop = null;
        this.running = false;
        this.resize();
    }
    
    initialise() {
        
    }
    
    // I had to use a setInterval here because it lagged running at max while loop speeds
    
    run() {
        if (this.runLoop != null) return;
        this.running = true;
        this.runLoop = setInterval(() => {
            // Main game loop function
            // Here we call various update and draw methods
            
            var w = this.canvasSize.w;
            var h = this.canvasSize.h;
            
            // Clear canvas for re-draw
            engine.contextData.clearRect(0, 0, w, h);
            this.objects.forEach(item => {
                item.update();
                item.draw();
            });
        }, 1);
    }
    
    stop() {
        clearInterval(this.runLoop);
        this.runLoop = null;
        this.running = false;
    }
    
    resize() {
        var w = this.canvasSize.w;
        var h = this.canvasSize.h;
        
        var temp_canvas = document.createElement('canvas');
        var temp_ctx = temp_canvas.getContext('2d');
        
        temp_canvas.width = w;
        temp_canvas.height = h;
        temp_ctx.fillStyle = this.backgroundColor;
        temp_ctx.fillRect(0,0,w,h);
        temp_ctx.drawImage(this.canvasData, 0, 0, w, h);
        
        this.canvasData.width = w; 
        this.canvasData.height = h;
        this.contextData.drawImage(temp_canvas, 0, 0);
    }
    
    keyHandler(e) {
        if (e.type == "keydown") {
            switch(e.keyCode) {
                case 13: {
                    // enter key
                    if (this.running) this.stop();
                    else engine.run();
                    break;
                }
                case 32: {
                    // space bar
                    game_data._imgIndex += 1;
                    if (game_data._imgIndex > images.length-1) game_data._imgIndex = 0;
                    break;
                }
                // Arrow Keys
                // left, up, right, down
                case 37: {
                    // left arrow key
                    game_data._arrowKeys.left = true;
                    break;
                }
                case 38: {
                    // up arrow key
                    game_data._arrowKeys.up = true;
                    break;
                }
                case 39: {
                    // right arrow key
                    game_data._arrowKeys.right = true;
                    break;
                }
                case 40: {
                    // down arrow key
                    game_data._arrowKeys.down = true;
                    break;
                }
            }
        }
        
        if (e.type == "keyup") {
            switch(e.keyCode) {
                // Arrow Keys
                // left, up, right, down
                case 37: {
                    // left arrow key
                    game_data._arrowKeys.left = false;
                    break;
                }
                case 38: {
                    // up arrow key
                    game_data._arrowKeys.up = false;
                    break;
                }
                case 39: {
                    // right arrow key
                    game_data._arrowKeys.right = false;
                    break;
                }
                case 40: {
                    // down arrow key
                    game_data._arrowKeys.down = false;
                    break;
                }
            }
        }
    }
}