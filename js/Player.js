
function Player(nickname, x, y) {

    this.pos = {x: x, y: y};
    this.speed = {x: 0, y: 0};
    this.targetSpeed = {x: 0, y: 0};
    this.maxSpeed = 5;

    this.nickname = nickname;

    this.container = new PIXI.Container();

    this.spr = new PIXI.Sprite.from(resources.player2.texture);
    this.spr.anchor.set(0.5, 1.0);
    
    this.style = new PIXI.TextStyle({
        fill: 'black',
        fontSize: 64,
        fontFamily: 'pixel'
    });
    this.container.addChild(this.spr);
    
    this.nicknameText = new PIXI.Text(this.nickname, this.style);
    this.nicknameText.anchor.set(0.5, 1.0);
    this.nicknameText.y = -this.spr.height;
    this.nicknameText.zIndex = 1000;
    this.nicknameText.scale.set(0.2);
    this.container.addChild(this.nicknameText);

    game.addChild(this.container);
    
    var options = {
        restitution: 0.5,
        friction: 1,
        density: 0.01,
        restitution: 0.01
    };
    this.body = Bodies.rectangle(x, y, 32, 32, options);
    Matter.Body.setCentre(this.body, {x: 0, y: 16}, true);

    this.body.label = 'player';
    World.add(world, this.body);
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
    
    Matter.Body.translate(this.body, {x: this.speed.x, y: this.speed.y});

    this.pos = this.body.position;    

    this.container.x = this.pos.x;
    this.container.y = this.pos.y;
    this.container.zIndex = this.pos.y;
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