module.exports = class MovimentScreen{
    MovimentInitialized = false;
    MovimentClearInterval =false;
    IntervalMoviment=150;
    breakpointWidth = window.screen.width /10;
    moveScreenWidth =window.screen.width /8;

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

            // if screen > level width dont move camera
            if(this.verify.ajust()){
                return false
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
    adjust(){
        
        //variable to know if it advances or goes back in level
        if(!this.levelActualy){
            this.levelActualy=this.MainThis.levelLoader.levelNum;
        }

        // if it advances it puts the screen at the beginning, if not at the end
        if(this.MainThis.levelLoader.levelNum >= this.levelActualy){
            this.gameContainer.style.left ="0px";
        }else{
            let screenMoviment  =document.body.offsetWidth - (((this.gameContainer.style.left).split('px')[0]));
            let levelWidth=this.MainThis.levelLoader.levelWidth;            
            this.gameContainer.style.left = -(levelWidth - screenMoviment) + "px";
        }

        /*If level width < screen , ajust level */
        if(this.verify.ajust()){
            let sum= (window.screen.width - this.MainThis.levelLoader.levelWidth) / 2;
            this.gameContainer.style.left = sum +"px";
        }

        // set level actualy and change breakpoints
        this.levelActualy=this.MainThis.levelLoader.levelNum;
        this.breakpoints.status=true;
    }
     /*move screen position x */
    move={
        left:()=>{
            // if the screen can move
            if(!this.verify.moveLeft()){
                return false
            }
            // enable positions in container
            if(!this.gameContainer.style.left){
                this.gameContainer.style.left ="0px";
            }
        

                // Define params for the screen actualy
            let left = parseInt((this.gameContainer.style.left).split('px')[0]);
            let positionRightScreen=-1*(left + this.moveScreenWidth);

                // if the movement of the camera exceeds the limit of the level, move the necessary so that the screen does not protrude from the level
            if(this.moveScreenWidth > positionRightScreen){
                this.gameContainer.style.left = (left + (this.moveScreenWidth +positionRightScreen) )+ "px";
            }else{
                this.gameContainer.style.left = (left + this.moveScreenWidth)  + "px";
            }

        },
        right:()=>{            
                // if the screen can move
            if(!this.verify.moveRight()){
                return false
            }
                // enable positions in container
            if(!this.gameContainer.style.left){
                this.gameContainer.style.left ="0px";
            }


                // Define params for the screen actualy
            let left = parseInt((this.gameContainer.style.left).split('px')[0]);
            let positionRightScreen =(-1*(left - this.moveScreenWidth) + document.body.offsetWidth)

                // if the movement of the camera exceeds the limit of the level, move the necessary so that the screen does not protrude from the level
            if(this.moveScreenWidth > (this.MainThis.levelLoader.levelWidth - positionRightScreen)){                    
                this.gameContainer.style.left = (left -1*(this.moveScreenWidth +(this.MainThis.levelLoader.levelWidth - positionRightScreen)) )  + "px";
            }else{
                this.gameContainer.style.left = (left - this.moveScreenWidth)  + "px";
            }

        },
    }
    /*if the screen can move */
    verify={
        moveLeft:()=>{
            return this.gameContainer.style.left.split('px')[0] < 0;
        },
        moveRight:()=>{
            let screenMoviment  =document.body.offsetWidth - (((this.gameContainer.style.left).split('px')[0]));
            let levelWidth=this.MainThis.levelLoader.levelWidth;            
            return (screenMoviment < levelWidth);            
        },
        ajust:()=>{
            return this.MainThis.levelLoader.levelWidth < window.screen.width
        }
    }

}