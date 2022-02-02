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

    /*make blocks based in matriz and push in Allblocks*/
function makeBlocks(){
    let aumentoY=0;
    BlocksMatriz.forEach((obj,key)=>{
    let aumentoX =0;
        obj.forEach((obj,key)=>{    
            let item;
                
    
            if(obj == 1){
                item =new Block2(aumentoX,aumentoY)
            }

            if(item){
                AllBlocks.push(item);
            }
    
            aumentoX +=BlockWidth;
        });
       
        aumentoY+=BlockHeight;
    });
}
    /*Remove old Blocks and add new blocks*/
function drawBlocks(NewBlocksItems){
        /*Remove old blocks */
    let BlocksToDelete = document.querySelectorAll('block');
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

/*Make Blocks based in matriz and push in array all Blocks */
makeBlocks();
/*Draw blocks int the dom */
drawBlocks(AllBlocks);
