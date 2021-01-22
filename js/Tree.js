

class Tree extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.container.x = x;
        this.container.y = y;
        this.container.zIndex = y;

        this.spr = new PIXI.Sprite.from(resources.tree.texture);
        this.spr.anchor.set(0.5, 1.0);
        this.container.addChild(this.spr);

        var options = {
            //isStatic: true
        };
        this.body = Bodies.rectangle(x, y, 16, 16, options);
        this.body.label = 'tree';
        Matter.Body.setCentre(this.body, {x: 0, y: 8}, true);
        World.add(world, this.body);

        this.pos = this.body.position;
        this.container.zIndex = this.pos.y;
        this.container.position = this.pos;
    }

    refresh() {

        this.spr.rotation = this.body.angle;
        this.container.position = this.body.position;

        if (this.container.visible) {
            if (hitTest(this, player)) {
                this.container.alpha = 0.7;
            } else {
                this.container.alpha = 1.0;
            }
        }

        //Matter.Body.translate(this.body, {x: 0.01, y: 0});
        //this.body.position;
        this.body.angle = 45;
    }

    remove() {
        game.removeChild(this.container);
    }
}