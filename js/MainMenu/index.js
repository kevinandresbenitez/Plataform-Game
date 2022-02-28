class MainMenu{
    /*Params levels */
    static levelLoader;
    static user;

    /*Levelsparams */
    static levelSelected = 0;
    static levelSelectedRightPosition= ((Levels.length * 800)-800)*-1;
    static levels=Levels.length;
    static levelsLeftLimit = Levels.length * 800;
  
    /*Create menu home */
    static createMenu(){
            /*      home Menu         */
        let MainMenu = document.createElement('div');
        MainMenu.classList.add('Main-menu');

            /*home Menu left bar*/
        let leftBar =document.createElement('div');
        leftBar.classList.add('left-Bar');
            /*Left bar buttons */
        let buttonStart =document.createElement('button');
        let buttonConfig =document.createElement('button');
        buttonStart.classList.add('button-start');
        buttonConfig.classList.add('button-config');
        buttonStart.style.background ="url('../../assets/img/Menu/Comenzar.png')";
        buttonConfig.style.background ="url('../../assets/img/Menu/Configuracion.png')";
        buttonStart.onclick=()=>{this.showLevels()};
        buttonConfig.onclick=()=>{this.showConfigModal()};                
        leftBar.appendChild(buttonStart);
        leftBar.appendChild(buttonConfig);
        
            /*home Menu right bar*/
        let rightBar =document.createElement('div');
        rightBar.classList.add('right-Bar');

        let topBar =document.createElement('div');
        let bottomBar =document.createElement('div');
        topBar.classList.add('top-Bar');
        bottomBar.classList.add('bottom-Bar');
        rightBar.appendChild(topBar);
        rightBar.appendChild(bottomBar);
            
        MainMenu.appendChild(leftBar);
        MainMenu.appendChild(rightBar);


            /*      Menu levels         */
        let loadLevelsMenu = document.createElement('div');
        loadLevelsMenu.classList.add('load-Levels-menu');


        let topBarLoadLevel =document.createElement('div');
        let levelsBar = document.createElement('div');
        let levelsInfo =document.createElement('div');        
        topBarLoadLevel.classList.add('top-Bar-loadLevel');
        levelsBar.classList.add('levels-bar');
        levelsInfo.classList.add('levels-info');
        
        let prevPage = document.createElement('button');
        prevPage.classList.add('button-prev');
        prevPage.style.background="url('../../assets/img/Menu/Atras.png')";
        prevPage.onclick =()=>{this.showMenu()};
        topBarLoadLevel.appendChild(prevPage);


        let levelsItems=document.createElement('div');
        let buttonPrev=document.createElement('button');
        let buttonNext=document.createElement('button');
        levelsItems.classList.add('levels-items');
        buttonPrev.classList.add('button-prev');
        buttonNext.classList.add('button-next');
        buttonPrev.onclick=()=>{this.selectPrevLevel();this.drawInfoLevel()}
        buttonNext.onclick =()=>{this.selectNextLevel();this.drawInfoLevel()}
        levelsBar.appendChild(levelsItems)
        levelsBar.appendChild(buttonPrev)
        levelsBar.appendChild(buttonNext)



        let buttonStartGame = document.createElement('button');
        buttonStartGame.classList.add('button-start');
        buttonStartGame.onclick=()=>{main.initGame(this.levelSelected)}
        levelsInfo.appendChild(buttonStartGame);

        loadLevelsMenu.appendChild(topBarLoadLevel);
        loadLevelsMenu.appendChild(levelsBar);
        loadLevelsMenu.appendChild(levelsInfo);


            /*      Modal menu          */
        let config = document.createElement('div');
        config.classList.add('config');
        let blur = document.createElement('div');
        let modalConfig = document.createElement('div');
        let buttonClose = document.createElement('button');
        blur.classList.add('blur');
        modalConfig.classList.add('modal-config');
        buttonClose.classList.add('close')
        buttonClose.onclick=()=>{this.hideConfigModal()}
        modalConfig.appendChild(buttonClose);
        config.appendChild(blur);
        config.appendChild(modalConfig);


        /*Add in the dom */
        document.querySelectorAll('.container')[0].appendChild(MainMenu);
        document.querySelectorAll('.container')[0].appendChild(config)
        document.querySelectorAll('.container')[0].appendChild(loadLevelsMenu);

    }
    /*delete menu home */
    static deleteMenu(){
        let container = document.querySelectorAll('.container')[0];  
        container.innerHTML='';        
    }


    /*In home , menu level change level selected */
    static selectPrevLevel(){
        if((this.levelSelectedRightPosition * -1) != this.levelsLeftLimit - 800){
            let containerLevelItems = document.querySelectorAll('.levels-items')[0];
            this.levelSelectedRightPosition -= 800;
            containerLevelItems.style.right = this.levelSelectedRightPosition + "px";

            this.levelSelected -=1;
        }
    }
    static selectNextLevel(){                
        if(this.levelSelectedRightPosition != 0){
            let containerLevelItems = document.querySelectorAll('.levels-items')[0];
            this.levelSelectedRightPosition += 800;        
            containerLevelItems.style.right = this.levelSelectedRightPosition + "px";            
            this.levelSelected+=1;
        }
    }
    /*In home , menu level change info level selected */
    static drawInfoLevel(){        
        let InfoLevelContainer = document.querySelectorAll('.levels-info')[0];
        let button =InfoLevelContainer.querySelectorAll('.button-start')[0];
        button.onclick = ()=>{main.initGame(this.levelSelected)}        
    }


        /*Modal configs in home */
    static showConfigModal(){        
        document.querySelectorAll('.config')[0].style.display='block';
        document.querySelectorAll('.modal-config')[0].style.animation ='showModal 0.5s';
    }
    static hideConfigModal(){
        let modal = document.querySelectorAll('.modal-config')[0];
        modal.style.animation ='hideModal 0.5s';        
        modal.addEventListener('animationend', (e) => {
            if(e.animationName == 'hideModal'){
                document.querySelectorAll('.config')[0].style.display='none';
                modal.style.animation ='showModal 0.5s';
            }                                
        })
    }
        /*Page home */
    static hideMainMenu(){
        let leftBar =document.querySelectorAll('.left-Bar')[0];
        let topBar =document.querySelectorAll('.top-Bar')[0];
        let bottomBar =document.querySelectorAll('.bottom-Bar')[0];

        leftBar.style.animation='hideleftBar 1s';
        topBar.style.animation='hidetopBar 1s';
        bottomBar.style.animation='hidebottomBar 1s';

        setTimeout(()=>{
            leftBar.style.display='none';
            topBar.style.display='none';
            bottomBar.style.display='none';
        },1000)


    }
    static showMenu(){
        this.hideLevels();
        
        let leftBar =document.querySelectorAll('.left-Bar')[0];
        let topBar =document.querySelectorAll('.top-Bar')[0];
        let bottomBar =document.querySelectorAll('.bottom-Bar')[0];

        leftBar.style.display='inline-flex';
        topBar.style.display='block';
        bottomBar.style.display='block';

        leftBar.style.animation='showleftBar 1s';
        topBar.style.animation='showtopBar 1s';
        bottomBar.style.animation='showbottomBar 1s';
    }
        /*Page home-load levels*/
    static hideLevels(){
        let loadLevelsMenu =document.querySelectorAll('.load-Levels-menu')[0];
        let topBar = document.querySelectorAll('.top-Bar-loadLevel')[0];                            
        topBar.style.animation='hideloadLevels 1s';
        loadLevelsMenu.style.animation ='hideloadLevels 1s';
        setTimeout(()=>{
            loadLevelsMenu.style.display='none';
            topBar.style.display ='none'
        },1000)
        
    }
    static showLevels(){
        this.hideMainMenu();
        let loadLevelsMenu =document.querySelectorAll('.load-Levels-menu')[0];
        let topBar = document.querySelectorAll('.top-Bar-loadLevel')[0];   
        let levelsItems=document.querySelectorAll('.levels-items')[0];
        
        Levels.forEach((obj)=>{    
            let item=document.createElement('div');
            item.classList.add('items');
            item.innerText = obj.nameLevel;
            levelsItems.appendChild(item);
            /*Set position to level selected now */
            levelsItems.style.right = this.levelSelectedRightPosition + "px";
        })
        


        loadLevelsMenu.style.display="block"                
        topBar.style.display='block';
        topBar.style.animation="showloadLevels  1s";
        loadLevelsMenu.style.animation ="showloadLevels  1s";
    }



    /* Escape modal in game  */
    static createEscapeMenu(){
        /*      Modal menu          */
        let config = document.createElement('div');
        config.classList.add('escape-menu');
        let blur = document.createElement('div');
        let modalConfig = document.createElement('div');
        let buttonClose = document.createElement('button');
        blur.classList.add('blur');
        modalConfig.classList.add('modal-config');
        buttonClose.innerText = 'Salir';
        buttonClose.classList.add('close')        
        buttonClose.onclick=()=>{main.endGame()};
        modalConfig.appendChild(buttonClose);
        config.appendChild(blur);
        config.appendChild(modalConfig);

        /*Add menu in the dom */
        document.querySelectorAll('.container')[0].appendChild(config)
    }
    static showEscapeMenu(){
        document.querySelectorAll('.escape-menu')[0].style.display = 'block';
    }
    static hiddeEscapeMenu(){
        document.querySelectorAll('.escape-menu')[0].style.display = 'none';
    }
    static deleteEscapeMenu(){        
        document.querySelectorAll('.container')[0].removeChild(
        document.querySelectorAll('.escape-menu')[0]);

    }


}

