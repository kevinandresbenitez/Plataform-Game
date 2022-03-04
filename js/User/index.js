let levelLoader = require('../Levels/LevelLoader');

module.exports = class User{    
    inMoviment= false;    
    velosityRun;/*move spped */

    /*In set Timeout  move user*/
    moveRight;
    moveLeft;
    moveDown;
        /*Action jump user params */
    moveJump;
    jumpHeight;
    jumpSpeed;
    jumpStatus;/*Boolean for jump inteval */
    firstJump;/*User can jump if not used first jump ,else need run in floor */
        /*Gravity user */
    gravityStatus=true;/*Boolean for enable and disable grbvity  */

    constructor(params = false){
        this.parentContainer=document.querySelectorAll('.container')[0];
        this.id=params.id ? params.id : 'user';
        this.width=params.width || 60;
        this.height=params.height || 80;
        this.zIndex=8;
        this.speedMoviment =params.speedMoviment || 40;
        this.position= params.position ? params.position : [50,50];
        this.gravitySpeed = params.gravitySpeed || 40;
        this.velosityRun= params.velosityRun || 20 ;        
        this.jumpHeight = params.jumpHeight || 6;
        this.jumpSpeed=params.jumpSpeed || 50;

            /*User Img */        
        this.img='url(./assets/img/user/UserWaitRight.gif)';
    }
    /*Create user and set int the dom */
    create(x = this.position[0],y = this.position[1]){
        /*If the user exists */
        if(this.user){
            return false;
        }

        let user = document.createElement('div');
        user.id =this.id;
        user.style.width =this.width+'px';
        user.style.height =this.height+'px';
        user.style.zIndex=this.zIndex;
        
        user.style.background =this.img,
        user.style.left =x+ 'px';
        user.style.top =y+'px';

        /*For delete and create again user , and change position */
        this.position[0]=x;
        this.position[1]=y;

        this.parentContainer.appendChild(user);
        this.user=document.getElementById(this.id);
    }
    /*Remove user and kill instervals */
    remove(){
        this.parentContainer.removeChild(this.user);
        this.user=undefined;
        this.movimentClearInterval();        
        this.gravity.destroy();
    }


    /*Change parameters in the dom */
    draw(){                
        this.user.style.width=this.width + "px";
        this.user.style.height= this.height + "px";
        this.user.style.left= this.position[0] + 'px';
        this.user.style.top= this.position[1] + 'px';
        this.user.style.background=this.img;
    }
    /*Img User */
    setImg={
        WaitLeft:()=>{
            this.img ='url(./assets/img/user/UserWaitLeft.gif)';
        },

        WaitRight:()=>{
            this.img = 'url(./assets/img/user/UserWaitRight.gif)';
        },

        RunLeft:()=>{
            this.img = 'url(./assets/img/user/UserRunLeft.gif)';
        },

        RunRight:()=>{
            this.img = 'url(./assets/img/user/UserRunRight.gif)';
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
                levelLoader.loadPrevLevel();
            }

            /*user level end,load next level */
            if(this.moveRight && this.verify.collisionBlockNextLevel() ){
                levelLoader.loadNextLevel();
            }

            /*Clear funtion to clear interval*/
            if(!this.IntervalInitialized){
                clearInterval(interval);
            }

        },this.speedMoviment)


    }


    /*Verifications - conditions for user */
    verify = {
        

        collisionBlockTop:()=>{
            for(let i =0 ;levelLoader.Blocks.length > i;i++){                
                let top = (this.position[1] + this.height == levelLoader.Blocks[i].topLeft[1] ) && (this.position[0] + this.width > levelLoader.Blocks[i].topLeft[0] && this.position[0] < levelLoader.Blocks[i].topRight[0]  );
                if(top){
                    return true;
                }                
            }
        },

        collisionBlockBottom:()=>{
            for(let i =0 ;levelLoader.Blocks.length > i;i++){
                let bottom =(this.position[1] == levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[0]+this.width > levelLoader.Blocks[i].buttomLeft[0] && this.position[0] < levelLoader.Blocks[i].buttomRight[0]  );
                if(bottom){
                    return true;
                }                
            }
        },

        collisionBlockRight:()=>{
            for(let i =0 ;levelLoader.Blocks.length > i;i++){
                let right =((this.position[0] + this.width == levelLoader.Blocks[i].buttomLeft[0]) && (this.position[1]  < levelLoader.Blocks[i].buttomLeft[1] ) && (this.position[1] > levelLoader.Blocks[i].topLeft[1] || this.position[1] + this.height > levelLoader.Blocks[i].topLeft[1]))
                if(right){
                    return true;
                }
            }
        },

        collisionBlockLeft:()=>{
            for(let i =0 ;levelLoader.Blocks.length > i;i++){
                let left =((this.position[0] == levelLoader.Blocks[i].buttomRight[0]) && (this.position[1]  < levelLoader.Blocks[i].buttomRight[1] ) && (this.position[1] > levelLoader.Blocks[i].topRight[1] || this.position[1] + this.height > levelLoader.Blocks[i].topRight[1]));
                if(left){
                    return true;
                }
            }
        },

        collisionWindowRight:()=>{
            let windowRight=(this.position[0]+this.width) >= main.WindowWidth;
            return windowRight;
        },

        collisionWindowLeft:()=>{
            let windowLeft=(this.position[0] == 0);            
            return windowLeft;
        },

        collisionBlockInitLevel:()=>{
            /*This block in the left screen */
            for(let i =0 ;levelLoader.BlocksInitLevel.length > i;i++){
                let left=(this.position[0] == levelLoader.BlocksInitLevel[i].topLeft[0]) && (this.position[1]  < levelLoader.BlocksInitLevel[i].buttomRight[1] ) && (this.position[1] > levelLoader.BlocksInitLevel[i].topRight[1] || this.position[1] + this.height > levelLoader.BlocksInitLevel[i].topRight[1]);                
                if(left){
                    return true;
                }
            }            
        },

        collisionBlockNextLevel:()=>{
            /*This block in the left screen */
            for(let i =0 ;levelLoader.BlocksEndLevel.length > i;i++){                
                let right=(this.position[0] + this.width == levelLoader.BlocksEndLevel[i].topRight[0]) && (this.position[1]  < levelLoader.BlocksEndLevel[i].buttomLeft[1] ) && (this.position[1] > levelLoader.BlocksEndLevel[i].topLeft[1] || this.position[1] + this.height > levelLoader.BlocksEndLevel[i].topLeft[1]) ;                
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
                },this.jumpSpeed)                                                                
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

                },this.gravitySpeed);
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