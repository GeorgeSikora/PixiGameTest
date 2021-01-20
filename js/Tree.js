

function Tree(x, y) {

    //console.log('Adding tree on ', x, y);

    this.pos = {x: x, y: y};
    
    this.container = new PIXI.Container();

    this.spr = new PIXI.Sprite.from(resources.tree.texture);
    this.spr.anchor.set(0.5, 1.0);
    this.container.addChild(this.spr);

    this.container.x = x;
    this.container.y = y;
    this.container.zIndex = y;

    game.addChild(this.container);

    // ADD COLLISION
    var options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, 16, 16, options);
    Matter.Body.setCentre(this.body, {x: 0, y: 8}, true);

    this.body.label = 'tree';
    World.add(world, this.body);
    
    this.refresh = (delta) => {

        /*
        if (cam.isInView(this)) {
            if (hitTest(this.container, player.container)) {
                this.container.alpha = 0.7;
            } else {
                this.container.alpha = 1.0;
            }
        }
        */

        /*
        if (hitTest(this.container, player.container)) {
            this.container.alpha = 0.7;
        } else {
            this.container.alpha = 1.0;
        }
        */
        
        this.pos = this.body.position;
        this.container.zIndex = this.pos.y;
        this.container.position = this.pos;

        //app.ticker.remove(this.refresher); // for removing
    }
    app.ticker.add(this.refresh);
}

Tree.prototype.remove = function() {
    for (var i = 0; i < objects.length; i++) {
        if (this == objects[i]) {
            game.removeChild(this.container);
            app.ticker.remove(this.refresher);
            objects.splice(i, 1);
            return;
        }
    }
}

function hitTest(s1, s2){

    /*
    if (o.pos.x > cam.pos.x - vw
        && o.pos.x < cam.pos.x + vw
        && o.pos.y > cam.pos.y - vh
        && o.pos.y < cam.pos.y + vh) {
    }
    */
	
    if ((s1.x-s1.width/2) + (s1.width/2) > (s2.x-s2.width/2))
       if ((s1.x-s1.width/2) < (s2.x-s2.width/2) + (s2.width/2))
           if ((s1.y-s1.height/2) + (s1.height/2) > (s2.y-s2.height/2))
               if ((s1.y-s1.height/2) < (s2.y-s2.height/2) + (s2.height/2))
                   return true;

   return false;
}