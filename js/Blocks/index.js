/*Classes */

class BlockClass{
    constructor(x,y){
        this.topLeft =[x,y];
        this.topRight =[x + 40 ,y];
        this.buttomLeft=[x,y +40];
        this.buttomRight=[x + 40,y +40];
    }

}    


class Block extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/blocks/Block.png)';
    }
}

class BlockGrandiet extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/blocks/BlockGrandiet.png)';
    }
}

class BlockMoreGrandiet extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/blocks/BlockMoreGrandiet.png)';
    }
}

class BlockNull extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='blockNull';
        this.color = 'url(../assets/img/blocks/BlockNull.png)';
    }
}