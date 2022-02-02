/*User params */
let userPositionDefault =[50,150];
let userPositionActualy=userPositionDefault;
let userWidth =20;
let userHeight=40;

/*Jump params  */
let userJumpSpeed =40;
let userJumpHeight = 4;
let userReadyToJump=true;/*variable to check that the user only jumps once for every time he hits the ground*/


/*Add user in the dom */
function createUser(){
    let  user = document.createElement('div');
    user.id ='user';
    user.style.width =userWidth+'px';
    user.style.height =userHeight+'px';

    user.style.left =userPositionDefault[0] + 'px';
    user.style.top =userPositionDefault[1] + 'px';

    container.appendChild(user)
}
/*Change position user in the dom */
function drawUser(){   
    let user = document.getElementById('user');
    user.style.left= userPositionActualy[0] + 'px';
    user.style.top= userPositionActualy[1] + 'px';
}
/*Verify if the user can move and call metod draw user */
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            /*Verifi dont colapse with the wall */
            if(userPositionActualy[0] == 0){                
                break
            }
            if(!verifyUserTouchBlockLeft()){
                userPositionActualy[0] -= 10 ;
            }            
            break
        case 'ArrowRight':            
            /*Verifi dont colapse with the wall */
            if((userPositionActualy[0]+userWidth) >= WindowWidth){
                break
            }            
            if(!verifyUserTouchBlockRight()){
                userPositionActualy[0] += 10 ;
            }            
            break
        case 'ArrowDown':            
            if(!verifyUserTouchBlockTop()){
                userPositionActualy[1] += 10 ;                
            }
            break
        case 'ArrowUp':            
            /*If the user touch the floor , can jump ,else not */                    
            if(!verifyUserTouchBlockTop()){                            
                return false
            }

            /*End gravity for jump */
            endGravity();

            /*user can jump once until it hits the ground */
            if(!userReadyToJump){                
                return false
            }
            userReadyToJump=false;

            let interaval =0;
            /*function to jump, it moves every so often */
            let Jump =setInterval(()=>{
                /*If user dont colapse with a block */
                if(!verifyUserTouchBlockBottom()){
                    userPositionActualy[1] -= 10 ;
                    drawUser();
                }                
                
                /*Clear interval and start gravity if end jump and , user jump*/
                if(userJumpHeight == interaval){                    
                    clearInterval(Jump);
                    startGravity();
                    userReadyToJump=true;
                }
                interaval ++;
            },userJumpSpeed)
            
            
            break
    }
    drawUser();
}



/*Verify if the user touch a block*/
function verifyUserTouchBlockTop(){  
    for(let i =0 ;AllBlocks.length > i;i++){
        let top = (userPositionActualy[1]+userHeight == AllBlocks[i].topLeft[1] ) && (userPositionActualy[0]+userWidth > AllBlocks[i].topLeft[0] && userPositionActualy[0] < AllBlocks[i].topRight[0]  ); 
        if(top){
            return true
        }        
    }
}
function verifyUserTouchBlockBottom(){  
    for(let i =0 ;AllBlocks.length > i;i++){
        let bottom =(userPositionActualy[1] == AllBlocks[i].buttomLeft[1] ) && (userPositionActualy[0]+userWidth > AllBlocks[i].buttomLeft[0] && userPositionActualy[0] < AllBlocks[i].buttomRight[0]  ); 
        if(bottom){
            return true
        }        
    }
}
function verifyUserTouchBlockLeft(){  
    for(let i =0 ;AllBlocks.length > i;i++){
        let left =((userPositionActualy[0] == AllBlocks[i].buttomRight[0]) && (userPositionActualy[1]  < AllBlocks[i].buttomRight[1] ) && (userPositionActualy[1] > AllBlocks[i].topRight[1] || userPositionActualy[1] + userHeight > AllBlocks[i].topRight[1]))
        if(left){        
            return true
        }        
    }
}
function verifyUserTouchBlockRight(){      
    for(let i =0 ;AllBlocks.length > i;i++){
        let right =((userPositionActualy[0] + userWidth == AllBlocks[i].buttomLeft[0]) && (userPositionActualy[1]  < AllBlocks[i].buttomLeft[1] ) && (userPositionActualy[1] > AllBlocks[i].topLeft[1] || userPositionActualy[1] + userHeight > AllBlocks[i].topLeft[1]))
        if(right){        
            return true
        }        
    }
}

/*Move user :) */
document.addEventListener('keydown',moveUser);

/*Add user*/
createUser();

