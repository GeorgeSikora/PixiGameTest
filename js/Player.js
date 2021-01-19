
function Player(x, y) {    

    this.pos = {x: 0, y: 0};
    this.speed = {x: 0, y: 0};
    this.targetSpeed = {x: 0, y: 0};
    this.maxSpeed = 5;

    this.container = new PIXI.Container();

    this.spr = new PIXI.Sprite.from(resources.player2.texture);
    this.spr.anchor.set(0.5, 1.0);
    //this.spr.parentGroup = gameGroup;

    this.container.addChild(this.spr);

    /*
    this.spr = new PIXI.Sprite.from(app.loader.resources.player.texture);
    this.spr.anchor.set(0.5);
    this.spr.parentGroup = gameGroup;
    this.container.addChild(this.gun);
    */

    game.addChild(this.container);
    
    this.spr.position = this.pos;
}

Player.prototype.move = function (delta) {
    if (keys[65]) { // A
        this.targetSpeed.x = -this.maxSpeed;
    }
    if (keys[68]) { // D
        this.targetSpeed.x = this.maxSpeed;
    }
    if (keys[87]) { // W
        this.targetSpeed.y = -this.maxSpeed;
    }
    if (keys[83]) { // S
        this.targetSpeed.y = this.maxSpeed;
    }

    this.speed.x += (this.targetSpeed.x - this.speed.x) * 0.15 * delta;
    this.speed.y += (this.targetSpeed.y - this.speed.y) * 0.15 * delta;
    
    this.pos.x += this.speed.x * delta;
    this.pos.y += this.speed.y * delta;

    this.spr.x = this.pos.x;
    this.spr.y = this.pos.y;
    this.container.zIndex = this.spr.y;
}

Player.prototype.getMouseAngle = function() {
    const mouse = app.renderer.plugins.interaction.mouse.global;

    if (cam.targetObj != this) return 0;

    var x = mouse.x + (cam.pos.x - this.pos.x);
    var y = mouse.y + (cam.pos.y - this.pos.y);
    
    const w = app.renderer.width;
    const h = app.renderer.height;

    return Math.atan2(y - h/2, x - w/2);
}

Player.prototype.shot = function() {

    const angle = this.getMouseAngle();

    let bullet = createBullet(player.pos, angle);
    bullets.push(bullet);
}