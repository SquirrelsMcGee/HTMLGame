class AssetDB {

    constructor() {
        this.db = {};
        this.count = 0;
    }

    add(name, value) {
        // Add asset to the db
        this.db [ name ] = value;

        // Increase count for future reference
        this.count++;

        // Return asset reference for use
        return this.db[ name ];
    }

    find(name) {
        // Return asset if exists, otherwise returns null
        return (this.db[name] != undefined) ? this.db[name] : null;
    }
}
