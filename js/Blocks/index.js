/*Classes */

class BlockClass{
    constructor(x,y,width,height){
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
        this.color = 'url(../assets/img/blocks/Block.png)';
    }
}

class BlockNull extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.class='blockNull';
        this.zIndex='5';
        this.color = 'url(../assets/img/blocks/BlockNull.png)';
    }
}

class BlockInitLevel extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.class='blockNull';
        this.zIndex='5';
        this.color = 'url(../assets/img/blocks/BlockInitLevel.png)';
    }
}

class BlockEndLevel extends BlockClass{
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.class='blockNull';
        this.zIndex='5';
        this.color = 'url(../assets/img/blocks/BlockEndLevel.png)';
    }
}