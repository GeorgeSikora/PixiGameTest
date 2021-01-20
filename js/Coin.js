

function Coin (x, y) {

    this.pos = {x: x, y: y};

    this.container = new PIXI.Container();
    game.addChild(this.container);

    var spr = new PIXI.Sprite.from(resources.coin.texture);
    spr.anchor.set(0.5, 1.0);
    this.container.addChild(spr);

    this.refresh = (delta) => {
        this.container.scale.x =  Math.cos(millis/200);
    }

    app.ticker.add(this.refresh);
}

Coin.prototype.remove = function() {
    for (var i = 0; i < objects.length; i++) {
        if (this == objects[i]) {
            game.removeChild(this.container);
            app.ticker.remove(this.refresher);
            objects.splice(i, 1);
            return;
        }
    }
}