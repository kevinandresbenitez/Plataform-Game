let BlockImg = require('../../assets/img/blocks/Block.png');
let BlockNullImg = require('../../assets/img/blocks/BlockNull.png');
let BlockInitLevelImg = require('../../assets/img/blocks/BlockInitLevel.png');
let BlockEndLevelImg = require('../../assets/img/blocks/BlockEndLevel.png');

/*Classes */
class BlockClass{
    constructor(x,y,width,height){
        this.width=width;
        this.height=height;
        this.topLeft =[x,y];
        this.topRight =[x + width ,y];
        this.buttomLeft=[x,y +height];
        this.buttomRight=[x + width,y + height];
    }

}    

class Block extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.class='block';
        this.zIndex='10';
        this.color = `url(${BlockImg})`;
    }
}

class BlockNull extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.class='blockNull';
        this.zIndex='5';
        this.color = `url(${BlockNullImg})`;
    }
}

class BlockInitLevel extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);   
        this.class='BlockInitLevel';
        this.zIndex='5';
        this.color = `url(${BlockInitLevelImg})`;
    }
}

class BlockEndLevel extends BlockClass{
    constructor(x,y,width,height){
        super(x+width,y,width,height);
        this.class='BlockEndLevel';
        this.zIndex='5';
        this.color = `url(${BlockEndLevelImg})`;
    }
}

module.exports ={Block,BlockNull,BlockInitLevel,BlockEndLevel};