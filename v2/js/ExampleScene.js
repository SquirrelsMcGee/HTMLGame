class ExampleScene extends Scene {
    constructor(engine) {
        super(engine);

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


        let player = new PlayerObject(this.engine);
        let player2 = new PlayerObject(this.engine);

        this.instantiate(player);
        this.instantiate(player2);



        player2.translate( {x: 100, y: 0} );


        this.destroy(player2, 2000);

        //let s1 = new OldSquare();
        //let s2 = new OldSquare();

        //s2.pos = {x: 200, y: 50};
        //this.assetDB.add("square0", s1);
        //this.assetDB.add("square1", s2);

    }

    update(time) {
        // Using default update order
        super.update(time);

        //this.assetDB.find("square0").update(ctx, time);
        //this.assetDB.find("square1").update(ctx, time);
        //this.assetDB.find("player").update(time);
    }


    render() {
        // Using default rendering order
        super.render();

        //this.assetDB.find("square0").draw(ctx);
        //this.assetDB.find("square1").draw(ctx);
        //this.assetDB.find("player").draw();
    }


}
