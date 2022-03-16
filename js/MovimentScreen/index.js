module.exports = class MovimentScreen{
    MovimentInitialized = false;
    MovimentClearInterval =false;
    IntervalMoviment=200;
    breakpointWidth = 200;
    moveScreenWidth =200;

    /*Poisitions to move screen , when the user is in breackpoints*/
    breakpoints={
        left:0,
        right:0,        
        status:true,
    }    

    constructor(MainThis){
        this.MainThis=MainThis;
        /*Define containers */
        this.gameContainer=document.querySelectorAll('.game-container')[0];
    }

    /*Move screen in interval */
    initMoviment(){
        /*If is initialized return false */
        if(this.MovimentInitialized){
            return false;
        }
        this.MovimentInitialized =true;

        let interval =setInterval(()=>{            
            /*Updates next breackpoint to move screen*/
            if(this.breakpoints.status){
                this.breakpoints.left = this.MainThis.user.position[0] - this.breakpointWidth;
                this.breakpoints.right = this.MainThis.user.position[0] + this.breakpointWidth;
                this.breakpoints.status = false;
            }

            /*if user pass breakpoint move screen and update breakpoints again*/
            if(this.MainThis.user.position[0] >= this.breakpoints.right){
                this.move.right();
                this.breakpoints.status = true;
            }else if(this.MainThis.user.position[0] <= this.breakpoints.left){
                this.move.left();
                this.breakpoints.status = true;
            }

            if(this.MovimentClearInterval){
                /*Restar moviment default */
                clearInterval(interval);
                this.MovimentInitialized = false;
                this.MovimentClearInterval =false;
            }

        },this.IntervalMoviment)
    }
     /*change position to default*/
    restore(){
        this.gameContainer.style.left ="0px";
        this.breakpoints.status=true;
    }
     /*move screen position x */
    move={
        left:()=>{
            // if the screen can move
            if(!this.verifyCanMove.left()){
                return false
            }

            if(this.gameContainer.style.left){
                let left = (this.gameContainer.style.left).split('px')[0];
                this.gameContainer.style.left = (parseInt(left) + this.moveScreenWidth)  + "px";
            }else{
                this.gameContainer.style.left ="0px";
            }
        },
        right:()=>{            
                // if the screen can move
            if(!this.verifyCanMove.right()){
                return false
            }

            if(this.gameContainer.style.left){
                let left = (this.gameContainer.style.left).split('px')[0];
                this.gameContainer.style.left = (parseInt(left) - this.moveScreenWidth)  + "px";
            }else{
                this.gameContainer.style.left ="0px";
            }
        },
    }
    /*if the screen can move */
    verifyCanMove={
        left:()=>{
            return this.gameContainer.style.left.split('px')[0] < 0;
        },

        right:()=>{
            let screenMoviment  =window.screen.width - (((this.gameContainer.style.left).split('px')[0]));
            let levelWidth=this.MainThis.levelLoader.levelWidth;            
            return (screenMoviment < levelWidth);            
        }
    }

}