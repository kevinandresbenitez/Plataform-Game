/*Boolean for know if the animation is in use */
let AnimationIsUsed = false;

/*For run animation*/
let EndAnimationRight =false;

function setAnimationUserStatus(boolean){
    AnimationIsUsed=boolean
}
function userAnimationRightStatus(boolean){
    EndAnimationRight =boolean;
}


    /*Animations user */

function AnimationUserMoveRight(){
    let user = document.getElementById('user');
    let imgs=[1,2,3,4];
    let img=0;

    if(AnimationIsUsed){
        return false
    };    
    setAnimationUserStatus(true)
    
    let interval =setInterval(()=>{     
        /*Repeat animation */                   
        user.style.background = 'url(../assets/img/user/MoveRight/'+(img+1)+'.png)';            
        if(img + 1 == imgs.length){
            img=0;            
        }else{
            img +=1;
        }
        
        if(EndAnimationRight){
            /*Set defaul user  animation*/
            user.style.background = 'url(../assets/img/user/UserNull.png';
            userAnimationRightStatus(false);
            setAnimationUserStatus(false);
            clearInterval(interval);
        }

    },100);
}

