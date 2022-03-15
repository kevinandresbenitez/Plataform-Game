let Blocks=require('../Blocks/index.js');

module.exports = class LevelLoader{
    /*Matriz  container , all blocks container array */
    Blocks=[];
    BlocksNulls=[];
    BlocksInitLevel=[];
    BlocksEndLevel=[];    

    // Containers
    blocksContext;
    blocksCanvas;
    container;

    constructor(MainThis,props){
        this.MainThis=MainThis;        

        // Create canvas element in the dom
        let canvas =document.createElement('canvas');
        canvas.id = 'canvas-blocks';
        canvas.height =window.screen.height;
        canvas.width =window.screen.width;
        document.querySelectorAll('.container')[0].appendChild(canvas);

        /*Define containers */
        this.container =document.querySelectorAll('.container')[0];
        this.blocksCanvas=document.getElementById('canvas-blocks');
        this.blocksContext =this.blocksCanvas.getContext('2d');
                
        /*Grid dimentions for matriz blocks*/
        this.MatrizBlockWidth=props.width ? props.width : 40;
        this.MatrizBlockHeight =props.height ? props.height : 40;
    }

    /*make blocks based in matriz and push in arrays for category */
    makeBlocks(LevelMap){
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
        });

        // restore order
        LevelMap.reverse();
    }
    /*Create new blocks in canvas*/
    drawBlocks(NewBlocksItems){        
        /*Make new blocks */
        NewBlocksItems.forEach((obj,key)=>{
            let img =new Image();            
            img.src =obj.color;
            img.onload =()=>{
                this.blocksContext.drawImage(img,obj.topLeft[0],obj.topLeft[1],obj.width,obj.height);  
            }
        }
    )}
    /*delete hold blocks in canvas*/
    removeBlocks(){
        this.blocksContext.clearRect(0, 0, window.screen.width,window.screen.height);
    }

    /*Function to load a level change level , but not change position user*/
    loadLevel(level){       
        this.nameLevel=level.nameLevel;
        this.levelNum =level.levelNum;
        this.userPositionDefault=level.userPositionDefault;
        this.prevLevel=level.prevLevel;
        this.nextLevel=level.nextLevel;

        /*Restore screen for change level*/
        if(this.MainThis.MovimentScreen){
            this.MainThis.MovimentScreen.restore()
        }

            /*Remove hold blocks and make news */
        this.removeBlocks();
        this.makeBlocks(level.level);
        this.drawBlocks(this.Blocks);
        this.drawBlocks(this.BlocksInitLevel);
        this.drawBlocks(this.BlocksEndLevel);
        this.drawBlocks(this.BlocksNulls);
    }    
    loadNextLevel(){        
        if(this.nextLevel){                  
            /*The name of the next level , convert to level var and change position user and load next level*/
            this.loadLevel(Levels[this.levelNum]);
            this.MainThis.user.position = this.userPositionDefault;
            this.MainThis.user.draw();
            return true
        }
        return false
    }
    loadPrevLevel(){
        if(this.prevLevel){
            /*The name of the next level , convert to level var and change position user and load prev level*/
            this.loadLevel(Levels[this.levelNum -2]);
            this.MainThis.user.position = this.userPositionDefault;
            this.MainThis.user.draw();
            return true
        }

        return false
    }

    // remove all for the dom
    remove(){
        this.container.removeChild(this.blocksCanvas);
    }
}