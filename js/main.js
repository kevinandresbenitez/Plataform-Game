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
    
    // Sections vars,configs
    static homeMenuSections = {
        homeMenu:true,
        homeConfig:false,
        homeLevel:false
    }
    static gameSections ={
        gameStart:false,
        scapeMenu:false
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
        Backgorund.backgroundLevel.create(Levels[levelNumber].background);/*delete backgorunds*/
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
        Backgorund.backgroundLevel.delete();/*delete backgorunds*/

        this.gameSections.gameStart=false;/*desabilite keyboards */

        this.createMenu();// Show menu
    }

    
    static keyBoard = {
        keyDown:(e)=>{ 
            /*If game initialized */
            if(this.gameSections.gameStart && !this.gameSections.scapeMenu){

                const moveRight=()=>{
                    this.user.moveRight=true;
                };
                const moveLeft=()=>{
                    this.user.moveLeft=true;
                };
                const moveDown=()=>{
                    this.user.moveDown=true;  
                };
                const jump=()=>{
                    this.user.moveJump=true;   
                };
                const showEscapeMenu=()=>{
                    /* Enable Menu exit */
                    this.Menu.escapeMenu.show();
                    this.gameSections.scapeMenu =true
                }
                const handlers={
                    ArrowRight:moveRight,
                    ArrowLeft:moveLeft,
                    ArrowDown:moveDown,
                    ArrowUp:jump,
                    Escape:showEscapeMenu
                }
                
                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }
                
                return true
                
            }else if(this.gameSections.scapeMenu){
                let modalConfig =document.querySelector('.modal-config');

                let configOptions = modalConfig.children;
                let configLenghts = configOptions.length;
                let activeItem =modalConfig.querySelector('.selected');
                
                    // Parse htmlCollection to array for get index .selecteed
                var configArray = Array.prototype.slice.call(configOptions);
                let activeItemPosition =configArray.indexOf(activeItem) + 1;
                

                const selectPrevOption=()=>{
                    if(configLenghts > 1 && (activeItemPosition - 1 > 0)){
                        configOptions[activeItemPosition - 1].classList.remove('selected');
                        configOptions[activeItemPosition - 2].classList.add('selected');
                    }
                }
                const selectNextOption=()=>{
                    if(configLenghts > 1 && (activeItemPosition < configLenghts)){
                        configOptions[activeItemPosition - 1].classList.remove('selected');
                        configOptions[activeItemPosition].classList.add('selected');
                    }
                }
                const hideEscapeMenu=()=>{
                    //Disable Menu exit
                    this.Menu.escapeMenu.hide();
                    this.gameSections.scapeMenu =false
                }
                const activeOption=()=>{
                    activeItem.click();
                }

                const handlers={
                    ArrowDown:selectNextOption,
                    ArrowUp:selectPrevOption,
                    Escape:hideEscapeMenu,
                    Enter:activeOption
                }
                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }

                return true;
            }else if(this.homeMenuSections.homeMenu){
                let leftBar = document.querySelector('.left-Bar');

                const selectNextOption=()=>{
                    leftBar.children[1].classList.add('selected');
                    leftBar.children[0].classList.remove('selected');
                }
                const selectPrevOption=()=>{
                    leftBar.children[0].classList.add('selected');
                    leftBar.children[1].classList.remove('selected');
                }
                const activeOption=()=>{
                    leftBar.querySelector('.selected').click()
                    this.homeMenuSections.homeMenu = false;
                }

                const handlers={
                    ArrowDown:selectNextOption,
                    ArrowUp:selectPrevOption,
                    Enter:activeOption,
                }
                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }

                return true
            }else if(this.homeMenuSections.homeConfig){
                const goHomeMenu=()=>{
                    this.homeMenuSections.homeMenu = true;
                    this.homeMenuSections.homeConfig = false;
                    this.Menu.homepage.hide.modalConfig()
                }

                const handlers ={
                    Escape:goHomeMenu
                }
                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }

                return true
            }else if(this.homeMenuSections.homeLevel){

                const selectNextLevel=()=>{
                    this.Menu.levelSection.selectNextLevel();
                    this.Menu.levelSection.drawInfo()
                }
                const selectPrevLevel=()=>{
                    this.Menu.levelSection.selectPrevLevel();
                    this.Menu.levelSection.drawInfo()   
                }
                const startGame=()=>{
                    this.homeMenuSections.homeLevel = false;
                    this.initGame(this.Menu.levelSelected);
                }
                const goHomepage=()=>{
                    this.homeMenuSections.homeMenu = true;
                    this.homeMenuSections.homeLevel = false;
                    this.Menu.homepage.show.homepage()
                }

                const handlers ={
                    ArrowRight:selectNextLevel,
                    ArrowLeft:selectPrevLevel,
                    Enter:startGame,
                    Escape:goHomepage
                }

                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }

                return true
            }
        },
        
        keyUp:(e)=>{
            if(this.gameSections.gameStart && !this.gameSections.scapeMenu){
                const stopMoveRight =()=>{
                    this.user.moveRight=false;
                    this.user.setImg.WaitRight();
                    this.user.draw();     
                };
                const stopMoveLeft =()=>{
                    this.user.moveLeft=false;
                    this.user.setImg.WaitLeft();
                    this.user.draw();          
                };
                const stopMoveDown =()=>{
                    this.user.moveDown=false;           
                };
                const stopJump =()=>{
                    this.user.moveJump=false;            
                };

                const handlers={
                    ArrowRight:stopMoveRight,
                    ArrowLeft:stopMoveLeft,
                    ArrowDown:stopMoveDown,
                    ArrowUp:stopJump,
                }
                
                if(handlers.hasOwnProperty(e.key)){
                    handlers[e.key]()
                }
                return true

            }
        }

    }
}


main.createMenu();

/*Add event */
document.addEventListener('keydown',main.keyBoard.keyDown);
document.addEventListener('keyup',main.keyBoard.keyUp);
