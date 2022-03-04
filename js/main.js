let MainMenu =require('./MainMenu/index');
let LevelLoader = require('./Levels/LevelLoader.js');
let User = require('./User/index.js');

    // Import Styles
require('../less/main.less');

class main{
    static levelLoader;
    static user;
    static gameStart;
    static scapeMenu;

    
    static showMenu(){       
        MainMenu.createMenu();
    }
    
    static initGame(levelNumber){
        /*Delete Menu */
        MainMenu.deleteMenu();

        /*Load Level */
        this.levelLoader = new LevelLoader();
        this.levelLoader.loadLevel(Levels[levelNumber]);

        /*Load user */            
        this.user = new User();
        this.user.create();
        this.user.gravity.main();
        this.user.startMoviment();

        /*Make escape menu */
        MainMenu.createEscapeMenu();

        /*avilite keyboards */
        this.gameStart=true;

    }

    static endGame(){
        /*Remove Blocks , remove user , and show menu */
        this.levelLoader.removeBlocks();
        this.user.remove();
        this.showMenu();

        /*Delete escape menu */
        MainMenu.deleteEscapeMenu();

        /*desabilite keyboards */
        this.gameStart=false;
    }

}

main.showMenu();
module.exports =main;

