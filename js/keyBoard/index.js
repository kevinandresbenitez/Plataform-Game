let main = require('../main.js');

/*Events for keboard*/
function keyDown(e){   
    if(main.gameStart){
        switch(e.key){
            case 'ArrowRight':
                main.user.moveRight=true;            
            break
            case 'ArrowLeft':
                main.user.moveLeft=true;            
            break
            case 'ArrowDown':
                main.user.moveDown=true;           
            break
            case 'ArrowUp':            
                main.user.moveJump=true;            
            break
            case 'Escape':
                if(main.scapeMenu){
                    MainMenu.hiddeEscapeMenu();
                    main.scapeMenu =false
                }else{
                    MainMenu.showEscapeMenu();
                    main.scapeMenu =true
                }
            break
        }
    }
}

function keyUp(e){
    if(main.gameStart){
        switch(e.key){
            case 'ArrowRight':
                main.user.moveRight=false;
                main.user.setImg.WaitRight();
                main.user.draw();           

            break
            case 'ArrowLeft':
                main.user.moveLeft=false;
                main.user.setImg.WaitLeft();
                main.user.draw();          
            break
            case 'ArrowDown':
                main.user.moveDown=false;           
            break
            case 'ArrowUp':
                main.user.moveJump=false;            
            break
        }
    }
}


/*Add event */
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);