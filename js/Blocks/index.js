/*Classes */

class BlockClass{
    constructor(x,y){
        this.topLeft =[x,y];
        this.topRight =[x + BlockWidth ,y];
        this.buttomLeft=[x,y +BlockHeight];
        this.buttomRight=[x + BlockWidth,y +BlockHeight];
    }

}    


class Block extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/Block.png)';
    }
}

class BlockGrandiet extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/BlockGrandiet.png)';
    }
}

class BlockMoreGrandiet extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='block';
        this.color = 'url(../assets/img/BlockMoreGrandiet.png)';
    }
}

class BlockNull extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.class='blockNull';
        this.color = 'url(../assets/img/BlockNull.png)';
    }
}