
class Bullet extends GameObject {
    constructor(x, y, angle) {
        super(x, y);

        this.diameter = 8; // 64
        this.speed = 10;
        this.angle = angle;

        this.spr = new PIXI.Sprite.from(resources.bullet.texture);
        this.spr.anchor.set(0.5);
        this.spr.scale.set(this.diameter/this.spr.width);
        this.container.addChild(this.spr);
        
        var options = {};
        this.body = Bodies.circle(x, y, this.diameter / 2, options);
        this.body.collisionFilter.group = playerCollisionGroup;
        World.add(world, this.body);
    }

    refresh(delta) {
        
        this.pos = this.body.position;

        const speedX = Math.cos(this.angle) * this.speed * delta;
        const speedY = Math.sin(this.angle) * this.speed * delta;
        
        Matter.Body.translate(this.body, {x: speedX, y: speedY});
        
        this.container.position = this.pos;
        this.spr.angle = deg(this.angle);
        this.container.zIndex = this.pos.y;

    }
}