let Blocks=require('../Blocks/index.js');
let Backgorund =require('../Background/index');

module.exports = class LevelLoader{
    /*Matriz  container , all blocks container array */
    Blocks=[];
    BlocksNulls=[];
    BlocksInitLevel=[];
    BlocksEndLevel=[];    

    // Containers
    blocksContext;
    blocksCanvas;
    gameContainer;

    /*Params screen */
    levelWidth;

    constructor(MainThis,props){
        this.MainThis=MainThis;        
        /*Grid dimentions for matriz blocks*/
        this.MatrizBlockWidth=props.width ? props.width : 40;
        this.MatrizBlockHeight =props.height ? props.height : 40;
    }

    // create container canvas
    makeContainerBlocks(width,height){
        // remove prev canvas 
        let Canvastodelete=document.getElementById('canvas-blocks');
        if(Canvastodelete){
            document.querySelectorAll('.game-container')[0].removeChild(Canvastodelete);
        }
        

        // Create canvas element in the dom
        let canvas =document.createElement('canvas');
        canvas.id = 'canvas-blocks';
        canvas.height =height ? height:window.screen.height;
        canvas.width =width ? width:window.screen.width;    
        document.querySelectorAll('.game-container')[0].appendChild(canvas);

        // Define container game
        this.gameContainer =document.querySelectorAll('.game-container')[0];
        this.blocksCanvas=document.getElementById('canvas-blocks');
        this.blocksContext =this.blocksCanvas.getContext('2d');

    }
    /*make,draw,remove blocks */
    blocks={
        /*make blocks based in matriz and push in arrays for category */
        make:(LevelMap)=>{
        /*Restore level load*/
        this.Blocks=[];
        this.BlocksNulls=[]
        this.BlocksInitLevel=[];
        this.BlocksEndLevel=[];

        /*Remplace All blocks for blocks objects */

        /*Blocks List
            Block  = 1  //Solid block colissions
            BlockFalse =5= //copy the block img , never colission block
            BlockNull = 4 =  // never coliision block 
            
            BlockInitLevel = 2 =  // Block init level
            BlockEndLevel = 3 = // Block end level
        
        */

        let aumentoY= window.innerHeight - this.MatrizBlockHeight;
        LevelMap.reverse().forEach((obj,key)=>{
        let aumentoX =0;
            obj.forEach((obj,key)=>{                   
                if(obj == 1){
                    this.Blocks.push(new Blocks.Block(aumentoX,aumentoY,this.MatrizBlockWidth,this.MatrizBlockHeight));
                }else if(obj == 2){
                    this.BlocksInitLevel.push(new Blocks.BlockInitLevel(aumentoX,aumentoY,this.MatrizBlockWidth / 2,this.MatrizBlockHeight));
                }else if(obj == 3){
                    this.BlocksEndLevel.push(new Blocks.BlockEndLevel(aumentoX,aumentoY,this.MatrizBlockWidth / 2,this.MatrizBlockHeight));
                }
                else if(obj == 4){
                    this.BlocksNulls.push(new Blocks.BlockNull(aumentoX,aumentoY,this.MatrizBlockWidth,this.MatrizBlockHeight));
                }
                else if(obj == 5){
                    this.BlocksNulls.push(new Blocks.BlockFalse(aumentoX,aumentoY,this.MatrizBlockWidth,this.MatrizBlockHeight));
                }
                aumentoX +=this.MatrizBlockWidth;
            });            
            aumentoY-=this.MatrizBlockHeight;

            /*Define width canvas */
            this.levelWidth=aumentoX;
            this.levelHeight=window.innerHeight - aumentoY;
        });

        // restore order
        LevelMap.reverse();

        },

        /*Create new blocks in canvas*/
        draw:(NewBlocksItems)=>{
                /*Make new blocks */
            NewBlocksItems.forEach((obj,key)=>{
                let img =new Image();            
                img.src =obj.color;
                img.onload =()=>{
                    this.blocksContext.drawImage(img,obj.topLeft[0],obj.topLeft[1],obj.width,obj.height);  
                }
            })
        },

        /*delete hold blocks in canvas*/
        remove:()=>{
            this.blocksContext.clearRect(0, 0, window.screen.width,window.screen.height);
        }
    }
    /*Load nextlevel prevlevel ,level(number)*/    
    load={
        level:(level)=>{
            /*Update level info*/
            this.nameLevel=level.nameLevel;
            this.levelNum =level.levelNum;
            this.background =level.background;
            this.userPositionEnd= Object.values(level.userPositionEnd);
            this.userPositionInitial=Object.values(level.userPositionInitial);
            this.prevLevel=level.prevLevel;
            this.nextLevel=level.nextLevel;
            
                /*Remove hold blocks and make news */
            this.blocks.make(level.level);
            this.makeContainerBlocks(this.levelWidth);
            this.blocks.remove();
            this.blocks.draw(this.Blocks);
            this.blocks.draw(this.BlocksInitLevel);
            this.blocks.draw(this.BlocksEndLevel);
            this.blocks.draw(this.BlocksNulls);

            /*adjust screen for level*/
            if(this.MainThis.MovimentScreen){
                this.MainThis.MovimentScreen.adjust()
            }
        },
        nextLevel:()=>{
            if(this.nextLevel){                  
                /*The name of the next level , convert to level var and change position user and load next level*/
                this.load.level(Levels[this.levelNum]);
                this.MainThis.user.changePosition([this.userPositionInitial[0] * this.MainThis.gameConfigurations.MasterScale , window.innerHeight -(this.userPositionInitial[1]* this.MainThis.gameConfigurations.MasterScale)]);
                this.MainThis.user.draw();
                
                // change backgorund
                Backgorund.backgroundLevel.change(this.background);

                return true
            }
            return false
        },
        prevLevel:()=>{
            if(this.prevLevel){
            /*The name of the next level , convert to level var and change position user and load prev level*/
            this.load.level(Levels[this.levelNum -2]);
            this.MainThis.user.changePosition([this.userPositionEnd[0] * this.MainThis.gameConfigurations.MasterScale , window.innerHeight -(this.userPositionEnd[1]* this.MainThis.gameConfigurations.MasterScale)]);
            this.MainThis.user.draw();

                // change backgorund
            Backgorund.backgroundLevel.change(this.background);

            return true
            }

            return false
        }
    }
    // remove all for the dom
    remove(){
        this.gameContainer.removeChild(this.blocksCanvas);
    }
}