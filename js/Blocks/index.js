/*Classes */

class BlockClass{
    constructor(x,y){
        this.topLeft =[x,y];
        this.topRight =[x + BlockWidth ,y];
        this.buttomLeft=[x,y +BlockHeight];
        this.buttomRight=[x + BlockWidth,y +BlockHeight];
    }

}    


class Block2 extends BlockClass{
    constructor(x,y){
        super(x,y);
        this.color = 'url(../assets/img/Blocks.png)';
    }
}
