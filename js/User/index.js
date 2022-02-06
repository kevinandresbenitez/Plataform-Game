class User{    
    inMoviment= false;    

    /*In set Timeout  move user*/
    moveRight=false;
    moveLeft=false;
    moveDown=false;
        /*Action jump user params */
    moveJump=false;
    jumpHeight=4;
    jumpSpeed=50;
    jumpStatus=false;/*Boolean for jump inteval */
    firstJump=true;/*User can jump if not used first jump ,else need run in floor */
        /*Gravity user */
    gravityStatus=true;/*Boolean for enable and disable grbvity  */
    

    constructor(params){
        this.id=params.id;
        this.width=params.width;
        this.height=params.height;
        this.speedMoviment =params.speedMoviment;
        this.img=params.img;
        this.position=[params.position[0],params.position[1]];
        this.gravitySpeed = params.gravitySpeed;

        /*Add event */
        document.addEventListener('keydown',this.keyDown);
        document.addEventListener('keyup',this.keyUp);

        /*Init gravity */
        this.gravity.main();
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
    
        user.style.background =this.img,
        user.style.left =x+ 'px';
        user.style.top =y+'px';

        /*For delete and create again user , and change position */
        this.position[0]=x;
        this.position[1]=y;

        container.appendChild(user);
        this.user=document.getElementById(this.id);
    }
    /*Remove user for dom */
    remove(){
        container.removeChild(this.user);
        this.user=undefined;
    }
    /*Change parameters in the dom */
    draw(){
        this.user.width=this.width;
        this.user.height=this.height;
        this.user.style.left= this.position[0] + 'px';
        this.user.style.top= this.position[1] + 'px';
        this.user.img=this.img;
    }

    /*Movent User */
    movimentClearInterval=()=>{
        /*Stop interval in move */
        this.movimentInterval=true;
    }
    startMoviment=()=>{
        /*Init interval */
        this.movimentInterval=false;

        /*If the moviment user is enabled */
        if(this.inMoviment){
            return false;
        }

        let interval=setInterval(()=>{                        
            /*Move user to Right */        
            if(this.moveRight && !this.verify.collisionBlockRight() && !this.verify.collisionWindowRight()){
                this.move.right();                                    
            }
            
            /*Move user to Left */
            if(this.moveLeft && !this.verify.collisionBlockLeft() && !this.verify.collisionWindowLeft()){
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

            /*Clear funtion to clear interval*/
            if(this.movimentInterval){
                clearInterval(interval);
            }

        },this.speedMoviment)


    }

    /*Events for keboard*/
    keyDown=(e)=>{
        switch(e.key){
            case 'ArrowRight':
                this.moveRight=true;
            break
            case 'ArrowLeft':
                this.moveLeft=true;
            break
            case 'ArrowDown':
                this.moveDown=true;
            break
            case 'ArrowUp':            
                this.moveJump=true;
            break
        }
    }
    keyUp=(e)=>{
        switch(e.key){
            case 'ArrowRight':
                this.moveRight=false;                
            break
            case 'ArrowLeft':
                this.moveLeft=false;
            break
            case 'ArrowDown':
                this.moveDown=false;
            break
            case 'ArrowUp':
                this.moveJump=false;
            break
        }
    }


    /*Verifications - conditions for user */
    verify = {
        collisionBlockTop:()=>{
            for(let i =0 ;AllBlocks.length > i;i++){
                let top = (this.position[1] + this.height == AllBlocks[i].topLeft[1] ) && (this.position[0]+this.width > AllBlocks[i].topLeft[0] && this.position[0] < AllBlocks[i].topRight[0]  );
                if(top){
                    return true;
                }                
            }
        },

        collisionBlockBottom:()=>{
            for(let i =0 ;AllBlocks.length > i;i++){
                let bottom =(this.position[1] == AllBlocks[i].buttomLeft[1] ) && (this.position[0]+this.width > AllBlocks[i].buttomLeft[0] && this.position[0] < AllBlocks[i].buttomRight[0]  );
                if(bottom){
                    return true;
                }                
            }
        },

        collisionBlockRight:()=>{
            for(let i =0 ;AllBlocks.length > i;i++){
                let right =((this.position[0] + this.width == AllBlocks[i].buttomLeft[0]) && (this.position[1]  < AllBlocks[i].buttomLeft[1] ) && (this.position[1] > AllBlocks[i].topLeft[1] || this.position[1] + this.height > AllBlocks[i].topLeft[1]))                
                if(right){
                    return true;
                }
            }
        },

        collisionBlockLeft:()=>{
            for(let i =0 ;AllBlocks.length > i;i++){
                let left =((this.position[0] == AllBlocks[i].buttomRight[0]) && (this.position[1]  < AllBlocks[i].buttomRight[1] ) && (this.position[1] > AllBlocks[i].topRight[1] || this.position[1] + this.height > AllBlocks[i].topRight[1]));
                if(left){
                    return true;
                }
            }
        },

        collisionWindowRight:()=>{
            let windowRight=(this.position[0]+this.width) >= WindowWidth;
            return windowRight;
        },

        collisionWindowLeft:()=>{
            let windowLeft=(this.position[0] == 0);            
            return windowLeft;
        }
    }
    /*Function to move user in x-y */
    move ={
        left:()=>{
            this.position[0] -= 10 ;
            this.draw();
        },

        right:()=>{
            this.position[0] += 10 ;
            this.draw();
        },

        bottom:()=>{
            this.position[1] += 10 ;
            this.draw();
        },
        
        top:()=>{
            this.position[1] -= 10 ;
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
            destroyGravity=true;
        },

        start:()=>{
            this.gravityStatus=true;
        },

        end:()=>{            
            this.gravityStatus=false;
        },
    }
}



let params={
    id:'user',
    width : 20,
    height: 40,
    speedMoviment:50,    
    position:[50,150],
    gravitySpeed:50
};

/*Initialize user*/
let user =new User(params);
user.create();
user.startMoviment();