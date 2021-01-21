
class Box extends GameObject {
    constructor(x, y) {
        super(x, y);
    
        this.container = new PIXI.Container();
        game.addChild(this.container);
    
        var spr = new PIXI.Sprite.from(resources.box.texture);
        spr.anchor.set(0.5, 1.0);
        this.container.addChild(spr);
    }
}