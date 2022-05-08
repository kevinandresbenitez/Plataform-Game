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
    MovimentScreen;
    Menu;
    
    static homeMenuSections = {
        homeMenu:true,
        homeConfig:false,
        homeLevel:false
    }
    static gameSections ={
        gameStart:false,
        gameSections:false
    }
    static gameConfigurations ={
        MasterScale:40,
    }



    static createMenu(){       
        this.Menu =new Menu(this);
        this.Menu.homepage.create.ALLMENU();

        /*Set default values*/
        this.homeMenuSections.homeMenu=true;
        this.homeMenuSections.homeLevel=false;
        this.homeMenuSections.homeConfig=false;
        this.gameSections.scapeMenu = false;

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
        this.levelLoader = new LevelLoader(this,{width:this.gameConfigurations.MasterScale,height:this.gameConfigurations.MasterScale});
        this.user = new User(this,{width:this.gameConfigurations.MasterScale+(this.gameConfigurations.MasterScale /2),height:this.gameConfigurations.MasterScale*2,velosityRun:this.gameConfigurations.MasterScale / 2,velosityRun:this.gameConfigurations.MasterScale/2,});


        // init Game XD
        this.levelLoader.load.level(Levels[levelNumber]);/*Load Level */
        this.MovimentScreen.initMoviment();/*Load screen moviment */
        Backgorund.levelLimitBackground.create();/*Load backgorunds*/
        this.gameSections.gameStart=true;/*avilite keyboards */

        /*Load user */
        this.user.create(this.levelLoader.userPositionInitial[0]*this.gameConfigurations.MasterScale,window.innerHeight-(this.gameConfigurations.MasterScale *this.levelLoader.userPositionInitial[1]));
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
        this.gameSections.gameStart=false;/*desabilite keyboards */

        this.createMenu();// Show menu
    }

    static keyBoard = {
        keyDown:(e)=>{ 

            if(this.gameSections.scapeMenu){
                let modalConfig =document.querySelector('.modal-config').querySelector('.selected');
                switch(e.key){
                    case 'Enter':
                        modalConfig.click();
                        return false
                    break
                }
            }

            if(this.gameSections.gameStart){
                switch(e.key){
                    case 'Escape':
                        if(this.gameSections.scapeMenu){
                            this.Menu.escapeMenu.hide();
                            this.gameSections.scapeMenu =false
                        }else{
                            this.Menu.escapeMenu.show();
                            this.gameSections.scapeMenu =true
                        }
                    break
                }
            }


            if(this.gameSections.gameStart && !this.gameSections.scapeMenu){
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
                }
            }else if(this.homeMenuSections.homeMenu){
                let leftBar = document.querySelector('.left-Bar');
                switch(e.key){
                    case 'ArrowUp':            
                        leftBar.children[0].classList.add('selected');
                        leftBar.children[1].classList.remove('selected');
                    break
                    case 'ArrowDown':
                        leftBar.children[1].classList.add('selected');
                        leftBar.children[0].classList.remove('selected');
                    break
                    case 'Enter':
                        leftBar.querySelector('.selected').click()
                        this.homeMenuSections.homeMenu = false;
                    break

                }
            }else if(this.homeMenuSections.homeConfig){
                switch(e.key){
                    case 'Escape':
                        this.homeMenuSections.homeMenu = true;
                        this.homeMenuSections.homeConfig = false;
                        this.Menu.homepage.hide.modalConfig()
                    break
                }
            }else if(this.homeMenuSections.homeLevel){
                switch(e.key){
                    case 'ArrowRight':
                        this.Menu.levelSection.selectNextLevel();
                        this.Menu.levelSection.drawInfo()
                    break
                    case 'ArrowLeft':
                        this.Menu.levelSection.selectPrevLevel();
                        this.Menu.levelSection.drawInfo()
                    break
                    case 'Enter':
                        this.homeMenuSections.homeLevel = false;
                        this.initGame(this.Menu.levelSelected);
                    break
                    case 'Escape':
                        this.homeMenuSections.homeMenu = true;
                        this.homeMenuSections.homeLevel = false;
                        this.Menu.homepage.show.homepage()
                    break
                }
            }
        },
        
        keyUp:(e)=>{
            if(this.gameSections.gameStart){
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
