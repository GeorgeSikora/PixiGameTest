
class Bullet extends GameObject {
    constructor(x, y, angle) {
        super(x, y);

        this.speed = 1;
        this.angle = angle;

        this.spr = new PIXI.Sprite.from(resources.bullet.texture);
        this.spr.anchor.set(0.5);
        this.spr.x = x;
        this.spr.y = y;
        this.spr.angle = angle;
        this.container.addChild(this.spr);

    }

    refresh(delta) {

        this.pos.x += Math.cos(this.angle) * this.speed * delta;
        this.pos.y += Math.sin(this.angle) * this.speed * delta;
        this.zIndex = this.pos.y;

    }
}