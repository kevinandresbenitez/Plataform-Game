// Import Styles
require('../less/main.less');

let MainMenu =require('./MainMenu/index');

class main{    
    static showMenu(){       
        MainMenu.createMenu();
    }

}

main.showMenu();

