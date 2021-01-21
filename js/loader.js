
function loadAssets() {
    loader.baseUrl = "assets/images/";
    loader
        .add("bullet", "bullet.png")
        .add("player", "player.png")
        .add("player2", "player2.png")
        .add("tree", "tree.png")
        .add("coin", "coin.png")
        .add("box", "box.png")
    ;
    loader.onProgress.add(loaderProgress);
    loader.onComplete.add(loaderComplete);
    loader.onError.add(loaderError);
    loader.load();
}

function loaderProgress(e) {
    console.log(e.progress);
}

function loaderComplete(e) {
    console.log("DONE LOADING!");
    player = new Player('Jurkos', 0, 0);
    cam = new Camera(player);

    // load map
    loadMap();
    
    objects.push(new FunnyText("Toto je test fontu ěšščřřžžá", 10, 10));

    // game loop
    gra.ticker.add(gameLoop);
}

function loaderError(e) {
    console.error("ERROR: " + e.message)
} 