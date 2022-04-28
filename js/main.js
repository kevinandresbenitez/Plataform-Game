let Menu =require('./Menu/index');
let LevelLoader = require('./Levels/LevelLoader.js');
let User = require('./User/index.js');
let MovimentScreen = require('./MovimentScreen/index.js');
let Backgorund=require('./Background/index.js');
    // Import Styles
require('../less/main.less');

class main{
    // Define instances
    levelLoader;
    user;
    gameStart;
    MovimentScreen;
    Menu;

    //boolean to know if the exit menu is active in the game
    scapeMenu;

    //Define master Scale , all params in the game derive from this scale
    static MasterScale =40;
    
    static createMenu(){       
        this.Menu =new Menu(this);
        this.Menu.homepage.create.ALLMENU();
    }
    static deleteMenu(){
        this.Menu.homepage.remove.ALLMENU();
    }
    
    static initGame(levelNumber){
        // Delete Menu
        this.deleteMenu();
        // create gameContainer and escape menu . Are required for create instances
        this.Menu.gameContainer.create();
        this.Menu.escapeMenu.create();


        // Define instances
        this.MovimentScreen= new MovimentScreen(this);
        this.levelLoader = new LevelLoader(this,{width:this.MasterScale,height:this.MasterScale});
        this.user = new User(this,{width:this.MasterScale+(this.MasterScale /2),height:this.MasterScale*2,velosityRun:this.MasterScale / 2,velosityRun:this.MasterScale/2,});


        // init Game XD
        this.levelLoader.load.level(Levels[levelNumber]);/*Load Level */
        this.MovimentScreen.initMoviment();/*Load screen moviment */
        Backgorund.levelLimitBackground.create();/*Load backgorunds*/
        this.gameStart=true;/*avilite keyboards */

        /*Load user */
        this.user.create(this.levelLoader.userPositionInitial[0]*this.MasterScale,window.innerHeight-(this.MasterScale *this.levelLoader.userPositionInitial[1]));
        this.user.gravity.start();
        this.user.startMoviment();

    }
    static endGame(){
        /*Remove Blocks , remove user , and show menu */
        this.levelLoader.remove();
        this.user.remove();
        this.Menu.escapeMenu.remove();/*Delete escape menu */
        this.Menu.gameContainer.remove();/*Delete escape menu */
        Backgorund.levelLimitBackground.delete();/*delete backgorunds*/
        this.gameStart=false;/*desabilite keyboards */

        this.createMenu();// Show menu
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


main.createMenu();

/*Add event */
document.addEventListener('keydown',main.keyBoard.keyDown);
document.addEventListener('keyup',main.keyBoard.keyUp);
