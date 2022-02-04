// /*Move user :) */
let moveUserRight=false;
let moveUserLeft=false;
let moveUserDown=false;
let moveUserUp=false;
let userSpeedRun=50;
/*Jumps params  */
let userJumpSpeed =40;
let userJumpHeight = 4;
let userJumpStatus = true;
let userFirstJumpUsed=false;

function userMoveStart(e){
    
    switch(e.key){
        case 'ArrowRight':
            moveUserRight=true;
        break
        case 'ArrowLeft':
            moveUserLeft=true;
        break
        case 'ArrowDown':
            moveUserDown=true;
        break
        case 'ArrowUp':     
            moveUserUp=true;
        break
    }

}
function userMoveEnd(e){
    
    switch(e.key){
        case 'ArrowRight':
            moveUserRight=false;
        break
        case 'ArrowLeft':
            moveUserLeft=false;
        break
        case 'ArrowDown':
            moveUserDown=false;
        break
        case 'ArrowUp':
            moveUserUp=false;
        break
    }

}
function userJump(){        
    /*if the user dont colapse with a top block and if the user used the first jump*/
     if(!verifyUserTouchBlockTop() && !userJumpStatus && userFirstJumpUsed){
        return false
    }
    userJumpStatus=false;
    userFirstJumpUsed=true;

    /*End gravity for jump */
    endGravity();

    
    let interaval =0;
    /*function to jump, it moves every so often */
    let Jump =setInterval(()=>{
        /*If user dont colapse with a block */
        if(!verifyUserTouchBlockBottom()){
            userPositionActualy[1] -= 10 ;
            drawUser();
        }
        
        /*Clear interval and start gravity if end jump and*/
        if(userJumpHeight == interaval){                    
            clearInterval(Jump);
            startGravity();            
        }
        interaval ++;
    },userJumpSpeed)
}


    /*Move user in interval*/
setInterval(()=>{
    /*User can jump */
    if(verifyUserTouchBlockTop() && !userJumpStatus){        
        userJumpStatus=true;
        userFirstJumpUsed=false;
    }
    
    /*Move user to Right */
    if(moveUserRight){
        /*Verifi dont colapse with the wall */
        if((userPositionActualy[0]+userWidth) >= WindowWidth){
            return false;
        }
        /*Verifi user dont colapse with a block */            
        if(!verifyUserTouchBlockRight()){            
            userPositionActualy[0] += 10 ;
            drawUser(); 
        }   
    }

    /*Move user to Left */
    if(moveUserLeft){
        /*Verifi dont colapse with the wall */
        if(userPositionActualy[0] == 0){                
           return false;
        }
        if(!verifyUserTouchBlockLeft()){
            userPositionActualy[0] -= 10 ;
            drawUser();
        }   
    }

    /*Move user to Down*/
    if(moveUserDown){
        if(!verifyUserTouchBlockTop()){
            userPositionActualy[1] += 10 ;   
            drawUser();             
        }
    }

    /*Move user to Up*/
    if(moveUserUp){
        if(!verifyUserTouchBlockBottom()){            
            userJump();
        }
    }


},userSpeedRun)

    /*Add events to move and stop move */
document.addEventListener('keydown',userMoveStart);
document.addEventListener('keyup',userMoveEnd);
