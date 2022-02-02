let GravityStatus;
let GravitySpeed = 50;
/* start Gravity */
function startGravity(){
    GravityStatus=true;

}
/* end Gravity */
function endGravity(){
    GravityStatus=false;
}

startGravity();

let Gravity =setInterval(()=>{
    if(GravityStatus){
        /*Gravity to user */        
        if(!verifyUserTouchBlockTop()){
            userPositionActualy[1] += 10 ;                
            drawUser();
        }                   
    }
},GravitySpeed);
