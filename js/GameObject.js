
class GameObject {
    constructor(x, y) {
        this.pos = {x: x, y: y};
        this.container = new PIXI.Container();
        game.addChild(this.container);
    }
    refresh() {
    }
    remove() {
    }
}

function hitTest(o1, o2){

    if (o1.pos == null) return false;

    const x1 = o1.pos.x; // x pos
    const y1 = o1.pos.y; // y pos
    
    if (o2.pos == null) return false;

    const x2 = o2.pos.x; // x pos
    const y2 = o2.pos.y; // y pos
    
    if (o1.container == null) return false;

    const w1 = o1.container.width / 2; // width
    const h1 = o1.container.height / 2; // height
    
    if (o2.container == null) return false;
    
    const w2 = o2.container.width / 2; // width
    const h2 = o2.container.height / 2; // height

    if (o1.spr == null) return false;

    const a1x = (o1.spr.anchor.x - 0.5) * o1.container.width; // anchor x
    const a1y = (o1.spr.anchor.y - 0.5) * o1.container.height; // anchor y

    if (o2.spr == null) return false;

    const a2x = (o2.spr.anchor.x - 0.5) * o2.container.width; // anchor x
    const a2y = (o2.spr.anchor.y - 0.5) * o2.container.height; // anchor y

    return(x1 + w1 - a1x > x2 - w2 - a2x
        && x1 - w1 - a1x < x2 + w2 - a2x
        && y1 + h1 - a1y > y2 - h2 - a2y
        && y1 - h1 - a1y < y2 + h2 - a2y);
}