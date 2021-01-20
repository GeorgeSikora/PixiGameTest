
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

    this.targetPos = this.targetObj.pos;

    this.pos.x += (this.targetPos.x - this.pos.x) * this.moveEasing;
    this.pos.y += (this.targetPos.y - this.pos.y) * this.moveEasing;
    
    this.scale += (this.targetScale - this.scale) * this.scaleEasing;

    game.position.x = app.renderer.width/2;
    game.position.y = app.renderer.height/2;
    
    game.pivot.x = this.pos.x;
    game.pivot.y = this.pos.y;

    game.scale.set(this.scale);
}



