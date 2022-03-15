let MainMenu =require('./MainMenu/index');
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
    static MasterScale = window.innerHeight > 800 ? 40:30; /* Scale Blocks User,moviment,speed,gravity ...*/
    
    static showMenu(){       
        this.MainMenu =new MainMenu(this);
        this.MainMenu.createMenu();
    }
    
    static initGame(levelNumber){
        /*Delete Menu */
        this.MainMenu.deleteMenu();
                
        /*Load Level */
        this.levelLoader = new LevelLoader(this,{width:this.MasterScale,height:this.MasterScale});
        this.levelLoader.loadLevel(Levels[levelNumber]);

        /*Load user */            
        this.user = new User(this,{width:this.MasterScale+(this.MasterScale /2),height:this.MasterScale*2,velosityRun:this.MasterScale / 2});
        this.user.create();
        this.user.gravity.main();
        this.user.startMoviment();

        /*Load screen moviment */
        this.MovimentScreen= new MovimentScreen(this);
        this.MovimentScreen.initMoviment();
        
        /*Make escape menu */
        this.MainMenu.createEscapeMenu();

        /*avilite keyboards */
        this.gameStart=true;

    }

    static endGame(){
        /*Remove Blocks , remove user , and show menu */
        this.levelLoader.remove();
        this.user.remove();
        this.MainMenu.deleteEscapeMenu();/*Delete escape menu */
        
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
                            this.MainMenu.hiddeEscapeMenu();
                            this.scapeMenu =false
                        }else{
                            this.MainMenu.showEscapeMenu();
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
