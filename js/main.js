let app, renderer, stage, loader, resources;
let game, display;
let cam;

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

engine = Engine.create();

let objects = [];

let player, tree;
let keys = {};
let keysDiv;

let bullets = [];
let bulletSpeed = 15;

let text1;
let funnyText;

var millisStart = new Date().getTime();

window.onload = function() {

    world = engine.world;
    engine.world.gravity.y = 0;

    // PIXI.utils.skipHello();

    app = new PIXI.Application(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x63c64d,
            antialias: false
        }
    );

    const gd = document.querySelector('#gameDiv');
    gd.appendChild(app.view);
    gd.addEventListener('pointerdown', mousePressed);

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    renderer = app.renderer;
    stage = app.stage;
    loader = app.loader;
    resources = app.loader.resources;

    ///////////////////////////////////////////////////////////////////////////
    
    stage.sortableChildren = true;

    game = new PIXI.Container();
    stage.addChild(game);

    display = new PIXI.Container();
    stage.addChild(display);

    game.sortableChildren = true;

    loader.baseUrl = "assets/images/";
    loader
        .add("bullet", "bullet.png")
        .add("player", "player.png")
        .add("player2", "player2.png")
        .add("tree", "tree.png")
        .add("coin", "coin.png")
    ;

    loader.onProgress.add(showProgress);
    loader.onComplete.add(doneLoading);
    loader.onError.add(reportError);
    loader.load();
}

function resize() {
    console.log(window.innerWidth, window.innerHeight, cam.getView());
    renderer.resize(window.innerWidth, window.innerHeight);
}
window.onresize = resize;

function mousePressed(e) {

    player.shot();

}

function createBullet(pos, angle) {
    let bullet = new PIXI.Sprite.from(resources.bullet.texture);

    bullet.anchor.set(0.5);
    bullet.x = pos.x;
    bullet.y = pos.y;
    bullet.angle = angle;
    game.addChild(bullet);

    return bullet;
}

function millis() {
    return new Date().getTime() - millisStart;
}

function gameLoop(delta) {
    Engine.update(engine);

    var visibleCount = 0;
    var start = millis();


    for (var i = 0; i < objects.length; i++) {
        var o = objects[i];
        if (cam.isInView(o)) {
            objects[i].container.visible = true;
            visibleCount++;
        } else {
            objects[i].container.visible = false;
        }
    }
    console.log('View handler:', millis() - start);
    console.log('Visible objects:', visibleCount);

    player.targetSpeed.x = 0;
    player.targetSpeed.y = 0;

    player.move(delta);

    updateBullets(delta);
    
    cam.refresh();

    stage.children.forEach(child => {
        if (child.screenX && child.screenY) {
            child.x = child.screenX - stage.x + stage.pivot.x;
            child.y = child.screenY - stage.y + stage.pivot.y;
        }
    });


    //stage.children.sort((a, b) => b.zIndex - a.zIndex);
}

function updateBullets(delta) {
    for (var i = 0; i < bullets.length; i++) {
        const b = bullets[i];

        b.x += Math.cos(b.angle) * bulletSpeed * delta;
        b.y += Math.sin(b.angle) * bulletSpeed * delta;
        b.zIndex = b.y;
    }
}

function keysDown(e) {
    keys[e.keyCode] = true;
}
function keysUp(e) {
    keys[e.keyCode] = false;
}

function showProgress(e) {
    console.log(e.progress);
}

function doneLoading(e) {
    console.log("DONE LOADING!");

    player = new Player('Jurkos', 0, 0);

    cam = new Camera(player);

    // load map
    loadMap();
    
    // keyboard event handlers
    window.addEventListener('keydown', keysDown);
    window.addEventListener('keyup', keysUp);
    
    funnyText = new FunnyText('hello', 0, 0);

    // game loop
    app.ticker.add(gameLoop);
} 

function loadMap() {
    
    for (var i = 0; i < 5000; i++) {
        addRandTree();
    }

    //objects.push(new Coin(0, 0));
}

function addRandTree() {
    objects.push(new Tree((Math.random()*2-1)*5000, (Math.random()*2-1)*5000)); 
}

function reportError(e) {
    console.error("ERROR: " + e.message)
} 