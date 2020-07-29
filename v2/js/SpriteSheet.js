class SpriteSheet {

    constructor(engine, imagePath, spriteSize, sheetRange) {

        // imagePath: path of the image to use, this can be base64 or svg data
        // spriteSize: the size of a sprite section in the sprite sheet, in the format { width: number, height: number }
        // sheetRange: the x,y ranges of the sprite sheet, in the format { x: number, y: number }
            // E.g. if a sheet has 10 images per row, with 2 rows, the sheet range would be { x: 10, y: 2 }

        this.engine = engine;

        this.imagePath = imagePath;

        this.ready = false;
        this.spriteSize = spriteSize;
        this.sheetRange = sheetRange;

        this.sheetIndex = { x: 0, y: 0 }; // Used for indexing the sprite sheet

        // Create image
        this.image = document.createElement('img');
        this.image.src = this.imagePath;
        this.image.onload = () => {
            this.ready = true;
        };

    }

    get sheetOffsets() {
        return { x: (this.spriteSize.x * this.sheetIndex), y: (this.spriteSize.y * this.sheetIndex.y) };
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
        this.sheetIndex.x += 1;
        if (this.sheetIndex.y >= this.sheetRange.y) this.sheetIndex.y = 0;
    }

    previousVertical() {
        this.sheetIndex.y -= 1;
        if (this.sheetIndex.y < 0) this.sheetIndex.y = (this.sheetRange.y - 1);
    }

    draw(position, renderSize) {

        // renderSize: Draws the sprite at a different size to the actual image dimensions
        if (renderSize == undefined) renderSize = this.spriteSize;

        // Wowie
        this.engine.ctx.drawImage(
            this.image,
            this.sheetOffsets.x, this.sheetOffsets.y,
            this.spriteSize.x, this.spriteSize.y,
            position.x, position.y,
            this.renderSize.x, this.renderSize.y
        );
    }

}
