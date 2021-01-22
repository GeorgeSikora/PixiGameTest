
function Player(nickname, x, y) {

    this.pos = {x: x, y: y};
    this.speed = {x: 0, y: 0};
    this.targetSpeed = {x: 0, y: 0};
    this.maxSpeed = 5;

    this.nickname = nickname;

    this.container = new PIXI.Container();
    game.addChild(this.container);

    this.spr = new PIXI.Sprite.from(resources.player2.texture);
    this.spr.anchor.set(0.5, 1.0);
    this.container.addChild(this.spr);

    this.w = this.spr.width;
    this.h = this.spr.height;

    this.style = new PIXI.TextStyle({
        fill: 'black',
        fontSize: 64,
        fontFamily: 'pixel'
    });
    
    this.nicknameText = new PIXI.Text(this.nickname, this.style);
    this.nicknameText.anchor.set(0.5, 1.0);
    this.nicknameText.y = -this.spr.height;
    this.nicknameText.zIndex = 1000;
    this.nicknameText.scale.set(0.2);
    this.container.addChild(this.nicknameText);

    var options = {
        /*
        restitution: 0,
        friction: 0,
        density: 0.1
        */
    };
    this.body = Bodies.rectangle(x, y, 24, 16, options);
    this.body.label = 'player';
    this.body.collisionFilter.group = playerCollisionGroup;
    Matter.Body.setCentre(this.body, {x: 0, y: 8}, true);
    World.add(world, this.body);
}

Player.prototype.move = function (delta) {

    this.targetSpeed.x = 0;
    this.targetSpeed.y = 0;

    this.body.angle = 45;

    this.spr.rotation = this.body.angle;

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

    this.pos = this.body.position;

    this.container.x = this.pos.x;
    this.container.y = this.pos.y;
    this.container.zIndex = this.pos.y;
    
    this.speed.x += (this.targetSpeed.x - this.speed.x) * 0.15 * delta;
    this.speed.y += (this.targetSpeed.y - this.speed.y) * 0.15 * delta;
    
    Matter.Body.translate(this.body, {x: this.speed.x, y: this.speed.y});
}

Player.prototype.getMouseAngle = function() {
    const mouse = gra.renderer.plugins.interaction.mouse.global;

    if (cam.targetObj != this) return 0;

    var x = mouse.x + (cam.pos.x - this.pos.x);
    var y = mouse.y + (cam.pos.y - this.pos.y);
    
    const w = gra.renderer.width;
    const h = gra.renderer.height;

    return Math.atan2(y - h/2, x - w/2);
}

Player.prototype.shot = function() {

    const angle = this.getMouseAngle();

    const x = this.pos.x;
    const y = this.pos.y - this.h / 2;

    objects.push(new Bullet(x, y, angle));
}