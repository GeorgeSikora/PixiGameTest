
// keyboard event handlers
$(document).on('keydown', keysDown);
$(document).on('keyup', keysUp);
$(document).on('mousedown', mousePressed);

let keys = {};

function mousePressed(e) {
    player.shot();
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

window.onresize = function () {
    renderer.resize(window.innerWidth, window.innerHeight);
}