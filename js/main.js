let gra, renderer, stage, loader, resources;

let game;

const Engine = Matter.Engine;
//const Render = Matter.Render;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let playerCollisionGroup = Body.nextGroup(true);
let objects = [];
let uiObjects =  [];

let cam;
let player;

var millisStart = new Date().getTime();

window.onload = function() {

    /*** Pixi.js ***/

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // disable pixels smoothing
    // PIXI.utils.skipHello();

    gra = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x63c64d,
        transparent: false
    });

    $('#gameDiv').append(gra.view);

    renderer = gra.renderer;
    stage = gra.stage;
    loader = gra.loader;
    resources = gra.loader.resources;

    game = new PIXI.Container();
    stage.addChild(game);

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
            o.refresh(delta);
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
}