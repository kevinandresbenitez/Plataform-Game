module.exports = class MovimentScreen{
    MovimentInitialized = false;
    MovimentClearInterval =false;
    IntervalMoviment=1000;
    breakpointWidth = 200;
    moveScreenWidth =200;

    /*Poisitions to move */
    breakpoints={
        left:0,
        right:0,        
        status:true,
    }    

    constructor(MainThis,props){
        this.MainThis=MainThis;
    }

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

    move={
        left:()=>{
            let container =document.querySelectorAll('.container')[0];
            if(container.style.left){                
                if(container.style.left.split('px')[0] < 0){
                    let left = (container.style.left).split('px')[0];
                    container.style.left = (parseInt(left) + this.moveScreenWidth)  + "px";
                }
            }else{
                container.style.left ="0px";
                setTimeout(()=>{
                    container.style.left =this.moveScreenWidth + "px";
                },1000)
            }
        },
        right:()=>{
            let container =document.querySelectorAll('.container')[0];
            if(container.style.left){                
                let left = (container.style.left).split('px')[0];
                container.style.left = (parseInt(left) - this.moveScreenWidth)  + "px";
            }else{
                container.style.left ="0px";
                setTimeout(()=>{
                    container.style.left =-this.moveScreenWidth +"px";
                },1000)
            }          
        },
    }

    restore(){
        let container =document.querySelectorAll('.container')[0];
        container.style.left ="0px";
        this.breakpoints.status=true;
    }

}