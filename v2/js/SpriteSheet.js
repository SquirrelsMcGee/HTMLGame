class SpriteSheet {

    constructor(engine, imagePath, spriteSize, sheetRange) {

        // imagePath: path of the image to use, this can be base64 or svg data
        // spriteSize: the size of a sprite section in the sprite sheet, in the format { width: number, height: number }
        // sheetRange: the x,y ranges of the sprite sheet, in the format { x: number, y: number }
            // E.g. if a sheet has 10 images per row, with 2 rows, the sheet range would be { x: 10, y: 2 }

        this.engine = engine;

        this.imagePath = imagePath;

        this.ready = false;
        this.spriteSize = Object.assign({}, spriteSize);
        this.sheetRange = Object.assign({}, sheetRange);

        this.sheetIndex = { x: 0, y: 0 }; // Used for indexing the sprite sheet

        this.invertAxis = { x: false, y: false };

        // Create image
        this.image = document.createElement('img');
        this.image.src = this.imagePath;
        this.image.onload = () => {
            this.ready = true;
        };

    }

    get sheetOffsets() {
        return { x: (this.spriteSize.width * this.sheetIndex.x), y: (this.spriteSize.height * this.sheetIndex.y) };
    }

    nextHorizontal() {
        this.sheetIndex.x += 1;
        if (this.sheetIndex.x >= this.sheetRange.x) this.sheetIndex.x = 0;
    }

    previousHorizontal() {
        this.sheetIndex.x -= 1;
        if (this.sheetIndex.x < 0) this.sheetIndex.x = (this.sheetRange.x - 1);
    }

    nextVertical() {
        this.sheetIndex.y += 1;
        if (this.sheetIndex.y >= this.sheetRange.y) this.sheetIndex.y = 0;
    }

    previousVertical() {
        this.sheetIndex.y -= 1;
        if (this.sheetIndex.y < 0) this.sheetIndex.y = (this.sheetRange.y - 1);
    }

    draw(position, renderSize) {

        // renderSize: Draws the sprite at a different size to the actual image dimensions

        if (renderSize == undefined) renderSize = this.spriteSize;
        let offsets = this.sheetOffsets;

        if (this.invertAxis.x) {
            this.engine.ctx.translate((renderSize.width/2) + position.x, 0);
            this.engine.ctx.scale(-1, 1);
            this.engine.ctx.translate(-((renderSize.width/2) + position.x), 0);
        }

        if (this.invertAxis.y) {
            this.engine.ctx.translate(0, (renderSize.height/2) + position.y);
            this.engine.ctx.scale(1, -1);
            this.engine.ctx.translate(0, -((renderSize.height/2) + position.y));
        }

        //this.engine.ctx.strokeRect(position.x, position.y, 4, 4);
;
        this.engine.ctx.drawImage(
            this.image,
            this.sheetOffsets.x, this.sheetOffsets.y,
            this.spriteSize.width, this.spriteSize.height,
            position.x, position.y,
            renderSize.width, renderSize.height
        );

        this.engine.ctx.resetTransform();
    }

}
