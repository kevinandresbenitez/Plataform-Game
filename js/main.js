let Menu =require('./Menu/index');
let LevelLoader = require('./Levels/LevelLoader.js');
let User = require('./User/index.js');
let MovimentScreen = require('./MovimentScreen/index.js');

    // Import Styles
require('../less/main.less');

class main{
    levelLoader;
    user;
    gameStart;
    scapeMenu;
    MovimentScreen;
    MasterScale =  40; /*window.innerHeight > 800 ? 40:30; Scale Blocks User,moviment,speed,gravity ...*/
    
    static showMenu(){       
        this.Menu =new Menu(this);
        this.Menu.homeMenu.create();
    }
    
    static initGame(levelNumber){
        /*Delete Menu and create gameContainer*/
        this.Menu.homeMenu.delete();
        this.Menu.gameContainer.create();
        
        /*Load Level */
        this.levelLoader = new LevelLoader(this,{width:this.MasterScale,height:this.MasterScale});
        this.levelLoader.load.level(Levels[levelNumber]);

        /*Load user */            
        this.user = new User(this,{width:this.MasterScale+(this.MasterScale /2),height:this.MasterScale*2,velosityRun:this.MasterScale / 2});
        this.user.create();
        this.user.gravity.main();
        this.user.startMoviment();

        /*Load screen moviment */
        this.MovimentScreen= new MovimentScreen(this);
        this.MovimentScreen.initMoviment();
        
        /*Make escape menu */
        this.Menu.escapeMenu.create();

        /*avilite keyboards */
        this.gameStart=true;

    }

    static endGame(){
        /*Remove Blocks , remove user , and show menu */
        this.levelLoader.remove();
        this.user.remove();
        this.Menu.escapeMenu.delete();/*Delete escape menu */
        this.Menu.gameContainer.delete();/*Delete escape menu */

        /*desabilite keyboards */
        this.gameStart=false;

        this.showMenu();
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
