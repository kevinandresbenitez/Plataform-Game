let Blocks=require('../Blocks/index.js');

module.exports = class LevelLoader{
    /*Matriz  container , all blocks container array */
    Blocks=[];
    BlocksNulls=[];
    BlocksInitLevel=[];
    BlocksEndLevel=[];

    constructor(MainThis,props){
        this.MainThis=MainThis;
        
        /*Define container */
        this.container =document.querySelectorAll('.container')[0];

        /*Grid dimentions for matriz*/
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
        let aumentoY=0;
        LevelMap.forEach((obj,key)=>{
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
                aumentoX +=this.MatrizBlockWidth;
            });
           
            aumentoY+=this.MatrizBlockHeight;
        });
    }
    /*Remove old Blocks and add new blocks in the dom*/
    drawBlocks(NewBlocksItems){        
        /*Make new blocks */
        NewBlocksItems.forEach((obj,key)=>{        
        /*Create block item dom */
        let element = document.createElement('div');
        element.classList.add(obj.class);
        element.style.top =obj.topLeft[1] + 'px';
        element.style.left =obj.topLeft[0] + 'px';
        element.style.width = obj.width +'px';        
        element.style.height = obj.height +'px';
        element.style.background=obj.color;
        element.style.position='absolute';
        element.style.backgroundSize = '100% 100%';
        element.style.zIndex=obj.zIndex;
        /*Ad item in the dom */
        this.container.appendChild(element);        
    })

    }
    removeBlocks(){
        /*Remove old blocks */
        let BlocksToDelete = document.querySelectorAll('.block , .blockNull , .BlockInitLevel , .BlockEndLevel');
        BlocksToDelete.forEach((obj,key)=>{                
            this.container.removeChild(obj);
        })
    }

    /*Function to load a level change level , but not change position user*/
    loadLevel(level){       
        this.nameLevel=level.nameLevel;
        this.levelNum =level.levelNum;
        this.userPositionDefault=level.userPositionDefault;
        this.prevLevel=level.prevLevel;
        this.nextLevel=level.nextLevel;

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
}