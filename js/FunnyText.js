
class FunnyText extends GameObject {
    constructor(str, x, y) {
        super(x, y);

        this.onScreen = true;

        this.style = new PIXI.TextStyle({
            fill: 'black',
            fontSize: 32,
            fontFamily: 'pixel'
        });
        this.text = new PIXI.Text(str, this.style);
        this.text.x = x;
        this.text.y = y;
        stage.addChild(this.text);

    }

    refresh() {
        
        this.text.x = 20 + 10 * Math.cos(millis()/200);
        this.text.y = 20 + 10 * Math.sin(millis()/100);

    }

    remove() {
        stage.removeChild(this.text);
    }
}