let Menu =require('./Menu/index');
let LevelLoader = require('./Levels/LevelLoader.js');
let User = require('./User/index.js');
let MovimentScreen = require('./MovimentScreen/index.js');
let Backgorund=require('./Background/index.js');
    // Import Styles
require('../less/main.less');

class main{
    levelLoader;
    user;
    gameStart;
    scapeMenu;
    MovimentScreen;
    static MasterScale =40;
    
    static showMenu(){       
        this.Menu =new Menu(this);
        this.Menu.homeMenu.create();
    }
    
    static initGame(levelNumber){
        /*Delete Menu and create gameContainer escape menu*/
        this.Menu.homeMenu.remove();
        this.Menu.gameContainer.create();
        this.Menu.escapeMenu.create();

        /*Load screen moviment */
        this.MovimentScreen= new MovimentScreen(this);
        this.MovimentScreen.initMoviment();

        /*Load Level */
        this.levelLoader = new LevelLoader(this,{width:this.MasterScale,height:this.MasterScale});
        this.levelLoader.load.level(Levels[levelNumber]);

        /*Load backgorunds*/
        Backgorund.levelLimitBackground.create();

        // params for the user using defaul scale
        let paramsUser={
            width:this.MasterScale+(this.MasterScale /2),
            height:this.MasterScale*2,velosityRun:this.MasterScale / 2,
            velosityRun:this.MasterScale/2,
        }

        /*Load user */            
        this.user = new User(this,paramsUser);
        this.user.create(this.levelLoader.userPositionInitial[0]*this.MasterScale,window.innerHeight-(this.MasterScale *this.levelLoader.userPositionInitial[1]));
        this.user.gravity.start();
        this.user.startMoviment();

        /*avilite keyboards */
        this.gameStart=true;
    }

    static endGame(){
        /*Remove Blocks , remove user , and show menu */
        this.levelLoader.remove();
        this.user.remove();
        this.Menu.escapeMenu.remove();/*Delete escape menu */
        this.Menu.gameContainer.remove();/*Delete escape menu */
        Backgorund.levelLimitBackground.delete();/*delete backgorunds*/

        /*desabilite keyboards */
        this.gameStart=false;

        this.Menu.homeMenu.create();
    }

    static keyBoard = {
        keyDown:(e)=>{   
            if(this.gameStart){
                switch(e.key){
                    case 'ArrowRight':
                        this.user.moveRight=true;                                    
                    break
                    case 'ArrowLeft':
                        this.user.moveLeft=true;            
                    break
                    case 'ArrowDown':
                        this.user.moveDown=true;           
                    break
                    case 'ArrowUp':            
                        this.user.moveJump=true;            
                    break
                    case 'Escape':
                        if(this.scapeMenu){
                            this.Menu.escapeMenu.hide();
                            this.scapeMenu =false
                        }else{
                            this.Menu.escapeMenu.show();
                            this.scapeMenu =true
                        }
                    break
                }
            }
        },
        
        keyUp:(e)=>{
            if(this.gameStart){
                switch(e.key){
                    case 'ArrowRight':
                        this.user.moveRight=false;
                        this.user.setImg.WaitRight();
                        this.user.draw();           
        
                    break
                    case 'ArrowLeft':
                        this.user.moveLeft=false;
                        this.user.setImg.WaitLeft();
                        this.user.draw();          
                    break
                    case 'ArrowDown':
                        this.user.moveDown=false;           
                    break
                    case 'ArrowUp':
                        this.user.moveJump=false;            
                    break
                }
            }
        }

    }

}


main.showMenu();

/*Add event */
document.addEventListener('keydown',main.keyBoard.keyDown);
document.addEventListener('keyup',main.keyBoard.keyUp);
