
function Camera (targetObject) {

    this.pos = {x: 0, y: 0};
    this.targetPos = {x: 0, y: 0};

    this.scale = 3;
    this.targetScale = 3;

    this.targetObj = targetObject;

    this.moveEasing = 0.23;
    this.scaleEasing = 0.1;
}

Camera.prototype.refresh = function() {

    this.scale = 3 + 0.2 * Math.sin(millis()/100.0);

    this.targetPos = this.targetObj.pos;

    this.pos.x += (this.targetPos.x - this.pos.x) * this.moveEasing;
    this.pos.y += (this.targetPos.y - this.pos.y) * this.moveEasing;
    
    this.scale += (this.targetScale - this.scale) * this.scaleEasing;

    game.position.x = gra.renderer.width / 2;
    game.position.y = gra.renderer.height /2;
    
    game.pivot.x = this.pos.x;
    game.pivot.y = this.pos.y;

    game.scale.set(this.scale);
    
    this.width = innerWidth / this.scale;
    this.height = innerHeight / this.scale;
}

Camera.prototype.isInView = function(o) {

    const vw = window.innerWidth / 2 / this.scale; // view width
    const vh = window.innerHeight / 2 / this.scale;// view height

    const ox = o.pos.x; // object x pos
    const oy = o.pos.y; // object y pos
    
    const ow = o.container.width; // object width
    const oh = o.container.height; // object height

    const oax = (o.spr.anchor.x - 0.5) * ow; // object anchor x
    const oay = (o.spr.anchor.y - 0.5) * oh; // object anchor y

    return (ox + ow/2 - oax > this.pos.x - vw
        && ox - ow/2 - oax < this.pos.x + vw
        && oy + oh/2 - oay > this.pos.y - vh
        && oy - oh/2 - oay < this.pos.y + vh);
}

Camera.prototype.getView = function() {
    return {
        x: window.innerWidth / this.scale,
        y: window.innerHeight / this.scale
    };
}