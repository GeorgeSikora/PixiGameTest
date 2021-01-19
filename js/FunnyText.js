

function FunnyText (str, x, y) {
    
    /* some text on screen */
    this.style = new PIXI.TextStyle({
        fill: 'black',
        fontSize: 32,
        fontFamily: 'pixel'
    });

    this.text = new PIXI.Text("Toto je testíček fontíku", this.style);
    this.text.x = 10;
    //text1.position = stage.pivot;
    //text1.anchor.set(0.5);
    display.addChild(this.text);
    
    this.refresh = (delta) => {
        
        this.text.x = 20 + 10 * Math.cos(millis/200);
        this.text.y = 20 + 10 * Math.sin(millis/100);

        //app.ticker.remove(this.refresher); // for removing
    }
    app.ticker.add(this.refresh);
}

FunnyText.prototype.remove = function () {
    app.ticker.remove(this.refresh);
    display.addChild(this.text);
    console.log('removing...');
}