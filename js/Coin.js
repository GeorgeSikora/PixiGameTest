

class Coin extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.zIndex = y;
        game.addChild(this.container);
    
        this.spr = new PIXI.Sprite.from(resources.coin.texture);
        this.spr.anchor.set(0.5, 1.0);
        this.container.addChild(this.spr);
    }
    refresh() {
        this.container.scale.x =  Math.cos(millis()/200);
    }
    remove() {
        game.removeChild(this.container);
    }
}