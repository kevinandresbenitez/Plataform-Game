let UserWaitRight = require('../../assets/img/user/UserWaitRight.gif')
let UserWaitLeft = require('../../assets/img/user/UserWaitLeft.gif')
let UserRunLeft = require('../../assets/img/user/UserRunLeft.gif')
let UserRunRight = require('../../assets/img/user/UserRunRight.gif')

module.exports = class User{    
    /*Params user */
    position;
    inMoviment= false;    
    velosityRun;/*move spped */

    /*In set Timeout  move user*/
    moveRight;
    moveLeft;
    moveDown;
        /*Action jump user params */
    moveJump;
    jumpHeight;
    frequencyJump;
    jumpStatus;/*Boolean for jump inteval */
    firstJump;/*User can jump if not used first jump ,else need run in floor */
        /*Gravity user */
    gravityStatus=true;/*Boolean for enable and disable grbvity  */    

    constructor(MainThis,params = false){
        this.MainThis=MainThis;

        this.parentContainer=document.querySelectorAll('.game-container')[0];
        this.id=params.id ? params.id : 'user';
        this.width=params.width ? params.width:60;
        this.height=params.height ? params.height : 80;
        this.zIndex=8;
        this.frequencyMoviment =params.frequencyMoviment ? params.frequencyMoviment : 40;
        this.frequencyGravity = params.frequencyGravity ? params.frequencyGravity : 40;
        this.velosityRun= params.velosityRun ? params.velosityRun : 20 ;        
        this.jumpHeight = params.jumpHeight || 6;
        this.frequencyJump=params.frequencyJump ? params.frequencyJump : 50;

            /*User Img */        
        this.img=`url(${UserWaitRight})`;
    }
    /*Create user and set int the dom */
    create(x,y){
        /*If the user exists */
        if(this.user){
            return false;
        }

        let user = document.createElement('div');
        user.id =this.id;
        user.style.width =this.width+'px';
        user.style.height =this.height+'px';
        user.style.zIndex=this.zIndex;
        
        user.style.backgroundImage =this.img,
        user.style.backgroundSize = '100% 100%';
        user.style.left =x+ 'px';
        user.style.top =y+'px';

        /*For delete and create again user , and change position */
        this.position=[x,y];

        this.parentContainer.appendChild(user);
        this.user=document.getElementById(this.id);
    }
    /*Remove user and kill instervals */
    remove(){
        this.parentContainer.removeChild(this.user);
        this.movimentClearInterval();
        this.gravity.destroy();
        this.user=undefined;
    }
    /*Change position user */
    changePosition(position){
        this.position=position;
    }

    /*Change parameters in the dom */
    draw(){
        this.user.style.width=this.width + "px";
        this.user.style.height= this.height + "px";
        this.user.style.left= this.position[0] + 'px';
        this.user.style.top= this.position[1] + 'px';
        this.user.style.backgroundImage=this.img;        
    }
    /*Img User */
    setImg={
        WaitLeft:()=>{
            this.img = `url(${UserWaitLeft})`;
        },

        WaitRight:()=>{
            this.img =`url(${UserWaitRight})`;
        },

        RunLeft:()=>{
            this.img =`url(${UserRunLeft})`;;
        },

        RunRight:()=>{
            this.img =`url(${UserRunRight})`;;
        }
    }


    /*Movent User */
    movimentClearInterval=()=>{
        /*Stop interval in move */
        this.IntervalInitialized=false;
    }
    startMoviment=()=>{

        /*If interval is initialized return false */
        if(this.IntervalInitialized){
            return false
        }
        /*stop future intervals when initialize */
        this.IntervalInitialized=true;        


    
        let interval=setInterval(()=>{
            /*Move user to Right */        
            if(this.moveRight && !this.verify.collisionBlockRight() && !this.verify.collisionWindowRight()){
                this.setImg.RunRight();
                this.move.right();
            }
            
            /*Move user to Left */
            if(this.moveLeft && !this.verify.collisionBlockLeft() && !this.verify.collisionWindowLeft()){
                this.setImg.RunLeft();
                this.move.left();                
            }
            /*Move user to Down*/
            if(this.moveDown && !this.verify.collisionBlockTop()){
                this.move.bottom();
            }

            /*Move user to Up*/
            if(this.moveJump && !this.verify.collisionBlockBottom()){
                this.actions.jump();
            }

            /*user level start,load prev level */
            if(this.moveLeft && this.verify.collisionBlockInitLevel() ){
                this.MainThis.levelLoader.load.prevLevel();
            }

            /*user level end,load next level */
            if(this.moveRight && this.verify.collisionBlockNextLevel() ){
                this.MainThis.levelLoader.load.nextLevel();
            }

            /*Clear funtion to clear interval*/
            if(!this.IntervalInitialized){
                clearInterval(interval);
            }

        },this.frequencyMoviment)


    }


    /*Verifications - conditions for user */
    verify = {
        

        collisionBlockTop:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){                
                let top = (this.position[1] + this.height == this.MainThis.levelLoader.Blocks[i].topLeft[1] ) && (this.position[0] + this.width > this.MainThis.levelLoader.Blocks[i].topLeft[0] && this.position[0] < this.MainThis.levelLoader.Blocks[i].topRight[0]  );
                if(top){
                    return true;
                }                
            }
        },

        collisionBlockBottom:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let bottom =(this.position[1] == this.MainThis.levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[0]+this.width > this.MainThis.levelLoader.Blocks[i].buttomLeft[0] && this.position[0] < this.MainThis.levelLoader.Blocks[i].buttomRight[0]  );
                if(bottom){
                    return true;
                }                
            }
        },

        collisionBlockRight:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let right =((this.position[0] + this.width == this.MainThis.levelLoader.Blocks[i].buttomLeft[0]) && (this.position[1]  < this.MainThis.levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[1] > this.MainThis.levelLoader.Blocks[i].topLeft[1] || this.position[1] + this.height > this.MainThis.levelLoader.Blocks[i].topLeft[1]))
                if(right){
                    return true;
                }
            }
        },

        collisionBlockLeft:()=>{
            for(let i =0 ;this.MainThis.levelLoader.Blocks.length > i;i++){
                let left =((this.position[0] == this.MainThis.levelLoader.Blocks[i].buttomRight[0]) && (this.position[1]  < this.MainThis.levelLoader.Blocks[i].buttomRight[1] ) && (this.position[1] > this.MainThis.levelLoader.Blocks[i].topRight[1] || this.position[1] + this.height > this.MainThis.levelLoader.Blocks[i].topRight[1]));
                if(left){
                    return true;
                }
            }
        },

        collisionWindowRight:()=>{
            let windowRight=(this.position[0]+this.width) >= this.MainThis.WindowWidth;
            return windowRight;
        },

        collisionWindowLeft:()=>{
            let windowLeft=(this.position[0] == 0);            
            return windowLeft;
        },

        collisionBlockInitLevel:()=>{
            /*This block in the left screen */
            for(let i =0 ;this.MainThis.levelLoader.BlocksInitLevel.length > i;i++){
                let left=(this.position[0] == this.MainThis.levelLoader.BlocksInitLevel[i].topLeft[0]) && (this.position[1]  < this.MainThis.levelLoader.BlocksInitLevel[i].buttomRight[1] ) && (this.position[1] > this.MainThis.levelLoader.BlocksInitLevel[i].topRight[1] || this.position[1] + this.height > this.MainThis.levelLoader.BlocksInitLevel[i].topRight[1]);                
                if(left){
                    return true;
                }
            }            
        },

        collisionBlockNextLevel:()=>{
            /*This block in the left screen */
            for(let i =0 ;this.MainThis.levelLoader.BlocksEndLevel.length > i;i++){                
                let right=(this.position[0] + this.width == this.MainThis.levelLoader.BlocksEndLevel[i].topRight[0]) && (this.position[1]  < this.MainThis.levelLoader.BlocksEndLevel[i].buttomLeft[1] ) && (this.position[1] > this.MainThis.levelLoader.BlocksEndLevel[i].topLeft[1] || this.position[1] + this.height > this.MainThis.levelLoader.BlocksEndLevel[i].topLeft[1]) ;                
                if(right){
                    return true;
                }
            }            
        }


    }
    /*Function to move user in x-y */
    move ={
        left:()=>{
            this.position[0] -= this.velosityRun;
            this.draw();
        },

        right:()=>{
            this.position[0] += this.velosityRun;
            this.draw();
        },

        bottom:()=>{
            this.position[1] += this.velosityRun;
            this.draw();
        },
        
        top:()=>{
            this.position[1] -= this.velosityRun ;
            this.draw();
        }  
    }
    /*Function what the user can use */
    actions={
        jump:()=>{            
            if((this.verify.collisionBlockTop() || this.firstJump )&& !this.verify.collisionBlockBottom() && !this.jumpStatus){
                this.jumpStatus=true;
                this.firstJump=false;
                this.gravity.end();
                
                let sec=0;
                let interval=setInterval(()=>{                    
                    /*Dont colapse */
                    if(!this.verify.collisionBlockBottom()){
                        this.move.top()
                    }
                                    
                    if(sec == this.jumpHeight){
                        clearInterval(interval);
                        this.gravity.start();
                        this.jumpStatus=false;
                        this.firstJump=false;
                    }

                    sec++;
                },this.frequencyJump)                                                                
            }            
        }
    }
    /*This function move user to floor in intervals, and is paused in user jump */
    gravity={
        main:()=>{
            if(this.gravityStatus){            
                let interval =setInterval(()=>{        
                    if(!this.verify.collisionBlockTop() && this.gravityStatus){
                        this.move.bottom();
                    }

                    /*Avalible first jump if the user run in the floor*/
                    if(this.verify.collisionBlockTop()){
                        this.firstJump=true;
                    }
                    
                    /*If the variable stop gravity */
                    if(this.destroyGravity){
                        clearInterval(interval);
                        this.destroyGravity=false;
                    }

                },this.frequencyGravity);
            }
        },

        destroy:()=>{
            this.destroyGravity=true;
        },

        start:()=>{
            this.gravityStatus=true;
        },

        end:()=>{            
            this.gravityStatus=false;
        },
    }
}