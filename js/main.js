/*Define elements */
let container =document.querySelectorAll('.container')[0];

/*Windows properys */
let WindowHeight= window.innerHeight;
let WindowWidth=window.innerWidth;
container.style.width=WindowWidth + 'px';
container.style.height=WindowHeight + 'px';


/*Block params */
const BlockWidth= 20;
const BlockHeight= 20;


    /*Container Blocks items based in matriz */
let AllBlocks=[];

    /*make blocks based in matriz and push in Allblocks */
function makeBlocks(LevelMap){
    /*Restore level load*/
    AllBlocks=[];

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
                AllBlocks.push(item);
            }
    
            aumentoX +=BlockWidth;
        });
       
        aumentoY+=BlockHeight;
    });
}
    /*Remove old Blocks and add new blocks in the dom*/
function drawBlocks(NewBlocksItems){
        /*Remove old blocks */
    let BlocksToDelete = document.querySelectorAll('.block');
    BlocksToDelete.forEach((obj,key)=>{        
        container.removeChild(obj);
    })

        /*Make new blocks */
    NewBlocksItems.forEach((obj,key)=>{
        /*Create block item dom */
        let element = document.createElement('div');
        element.classList.add('block');
        element.style.top =obj.topLeft[1] + 'px';
        element.style.left =obj.topLeft[0] + 'px';
        element.style.width = BlockWidth +'px';
        element.style.height = BlockHeight +'px';
        element.style.background=obj.color;

        /*Ad item in the dom */
        container.appendChild(element);
    })

}

/*Function to load a level */
function LoadLevel(MapLevel){
    makeBlocks(MapLevel);
    drawBlocks(AllBlocks);
}

/*load first level*/
LoadLevel(MapLevel1);