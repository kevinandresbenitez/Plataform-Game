class LevelLoader{
    /*Matriz  container , all blocks container array */
    AllBlocks=[];
    
    constructor(props){
        /*Window params */
        this.WindowHeight=window.innerHeight;
        this.WindowWidth=window.innerWidth;

        /*Define container */
        this.container =document.querySelectorAll('.container')[0];
        this.container.style.width=this.WindowWidth + 'px';
        this.container.style.height=this.WindowHeight + 'px';

        /*Blocks params */
        this.BlockWidth =40;
        this.BlockHeight =40;
    }

    /*make blocks based in matriz and push in Allblocks */
    makeBlocks(LevelMap){
        /*Restore level load*/
        this.AllBlocks=[];
    
        let aumentoY=0;
        LevelMap.forEach((obj,key)=>{
        let aumentoX =0;
            obj.forEach((obj,key)=>{    
                let item;                
                if(obj == 1){
                    item =new Block(aumentoX,aumentoY)
                }
    
                if(obj == 2){
                    item =new BlockGrandiet(aumentoX,aumentoY)
                }
    
                if(obj == 3){
                    item =new BlockMoreGrandiet(aumentoX,aumentoY)
                }
    
                if(obj == 4){
                    item =new BlockNull(aumentoX,aumentoY)
                }
    
                if(item){
                    this.AllBlocks.push(item);
                }
        
                aumentoX +=this.BlockWidth;
            });
           
            aumentoY+=this.BlockHeight;
        });
    }

    /*Remove old Blocks and add new blocks in the dom*/
    drawBlocks(NewBlocksItems){
        /*Remove old blocks */
    let BlocksToDelete = document.querySelectorAll('.block , .blockNull');
    BlocksToDelete.forEach((obj,key)=>{                
        this.container.removeChild(obj);
    })

        /*Make new blocks */
    NewBlocksItems.forEach((obj,key)=>{        
        /*Create block item dom */
        let element = document.createElement('div');
        element.classList.add(obj.class);
        element.style.top =obj.topLeft[1] + 'px';
        element.style.left =obj.topLeft[0] + 'px';
        element.style.width = this.BlockWidth +'px';
        element.style.height = this.BlockHeight +'px';
        element.style.background=obj.color;
        element.style.position='absolute';
        /*Ad item in the dom */
        this.container.appendChild(element);            
    })

    }

    /*Function to load a level change level , but not change position user*/
    loadLevel(level){
        this.nameLevel=level.nameLevel;
        this.userPositionDefault=level.userPositionDefault;
        this.prevLevel=level.prevLevel;
        this.nextLevel=level.nextLevel;

        this.makeBlocks(level.level);
        this.drawBlocks(this.AllBlocks);
    }    
    loadNextLevel(){
        if(this.nextLevel){            
            /*The name of the next level , convert to level var */
            this.loadLevel(eval(this.nextLevel));
            return true
        }
        return false
    }
    loadPrevLevel(){        
        if(this.prevLevel){
            /*The name of the next level , convert to level var */
            this.loadLevel(eval(this.prevLevel));
            return true
        }

        return false
    }
}