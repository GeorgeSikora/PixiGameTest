

function Tree(x, y) {

    console.log('Adding tree on ', x, y);
    
    this.container = new PIXI.Container();

    var spr = new PIXI.Sprite.from(resources.tree.texture);
    spr.anchor.set(0.5, 1.0);

    this.container.addChild(spr);
    
    this.container.x = x;
    this.container.y = y;
    this.container.zIndex = y;

    game.addChild(this.container);
}

Tree.prototype.remove = function() {
    for (var i = 0; i < objects.length; i++) {
        if (this == objects[i]) {
            game.removeChild(this.container);
            objects.splice(i, 1);
            return;
        }
    }
}