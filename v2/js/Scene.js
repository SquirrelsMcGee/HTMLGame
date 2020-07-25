class Scene {
    // Base class for scenes

    constructor(engine) {
        this.assetDB = new AssetDB();
        this.engine = engine;
        this.gameObjects = [];

        this.initialise();
    }

    initialise() {
        this.gameObjects.remove = function() {
            // Taken from StackOverflow
            // https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        }
    }

    findAsset(name) {
        return this.assetDB.find(name);
    }

    getAssetCount() {
        return this.assetDB.count;
    }

    update(time) {
        // Stub, to be implemented

        for (let gameObject of this.gameObjects) {
            if (gameObject.active) {
                gameObject.update(time);
            }
        }
    }

    render() {
        // Stub, to be implemented
        for (let gameObject of this.gameObjects) {
            if (gameObject.active) {
                gameObject.draw();
            }
        }
    }

    instantiate(gameObject) {
        this.gameObjects.push(gameObject);
    }

    destroy(gameObject, delay) {
        // Removes given GameObject from the world

        if (delay == undefined) delay = 0;
        if (delay < 0) delay = 0;

        setTimeout(() => {
            this.gameObjects.remove(gameObject);
        }, delay);
    }

}
