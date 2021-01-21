
function loadMap() {
    
    for (var i = 0; i < 5000; i++) {
        addRandTree();
    }

    objects.push(new Coin(1, 20));
}

function addRandTree() {
    objects.push(new Tree((Math.random()*2-1)*5000, (Math.random()*2-1)*5000)); 
}