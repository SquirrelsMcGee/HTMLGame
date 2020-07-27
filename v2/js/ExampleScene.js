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

        let player = new PlayerObject(this.engine);
        let player2 = new PlayerObject(this.engine);
        let player3 = new PlayerObject(this.engine);

        player2.name = "P2";
        player3.name = "P3";

        player2.transform.position = {x: 200, y: 380};
        player2.invertX = -1;
        //player2.collider = new CircleCollider(player2, 20);

        player2.freezeAxis = {x:true, y: true};

        player3.translate( {x: 250, y: 0} );
        player3.invertX = -1;
        player3.collider = new CircleCollider(player3, 20);

        this.instantiate(player);
        this.instantiate(player2);
        //this.instantiate(player3);



        //this.destroy(player2, 0);
    }

    update(time) {
        // Using default update order
        super.update(time);
    }


    render() {
        // Using default rendering order
        super.render();
    }


}
