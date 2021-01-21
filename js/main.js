let app, renderer, stage, loader, resources;
let game, display;

var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

let objects = [];
let uiObjects =  [];

let cam;
let player;

var millisStart = new Date().getTime();

window.onload = function() {

    /*** Pixi.js ***/

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // disable pixels smoothing
    // PIXI.utils.skipHello();

    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x63c64d,
        transparent: false
    });

    $('#gameDiv').append(app.view);

    renderer = app.renderer;
    stage = app.stage;
    loader = app.loader;
    resources = app.loader.resources;
    
    //stage.sortableChildren = true;

    game = new PIXI.Container();
    stage.addChild(game);

    display = new PIXI.Container();
    stage.addChild(display);

    game.sortableChildren = true;
    
    /*** Matter.js ***/

    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = 0;

    /*** other ***/

    loadAssets();
}

function gameLoop(delta) {
    Engine.update(engine);

    for (var i = 0; i < objects.length; i++) {
        var o = objects[i];
        if (o.onScreen) {
            o.refresh();
            continue;
        }
        if (cam.isInView(o)) {
            o.refresh(delta);
            objects[i].container.visible = true;
        } else {
            objects[i].container.visible = false;
        }
    }

    cam.refresh();

    player.move(delta);

    stage.children.forEach(child => {
        if (child.screenX && child.screenY) {
            child.x = child.screenX - stage.x + stage.pivot.x;
            child.y = child.screenY - stage.y + stage.pivot.y;
        }
    });

    //stage.children.sort((a, b) => b.zIndex - a.zIndex);
}