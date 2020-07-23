class Scene {
    // Base class for scenes

    constructor() {
        this.assetDB = new AssetDB();
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

    render(engine, ctx) {
        // Stub, to be implemented
    }

    update(engine, ctx, time) {
        // Stub, to be implemented
    }

    instantiate(gameObject) {
        gameObjects.push(gameObject);
    }

    destroy(gameObject) {
        gameObjects.remove(gameObject);
    }

}
