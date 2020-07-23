class ExampleScene extends Scene {
    constructor() {
        super();

        this.setup();
    }

    setup() {
        // Boilerplate testing
        // Adding simple assets to the db
        for (var i = 0; i < 10; i++) {
            this.assetDB.add("asset" + i, i);
        }

        // Adding script assets to the db
        this.assetDB.add("script0", () =>{  document.body.innerHTML += "<br>script0 has been called"; });

        // Adding drawable objects
        this.assetDB.add("square0", new Square());
    }

    render(engine, ctx) {
        //console.log("ExampleScene Rendering");
        this.assetDB.find("square0").draw(engine, ctx);
    }

    update(engine, ctx, time) {
        this.assetDB.find("square0").update(engine, ctx, time);
    }

}
