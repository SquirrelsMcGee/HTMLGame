class Scene {
    // Base class for scenes

    constructor() {
        this.assetDB = new AssetDB();
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

}
