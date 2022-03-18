let Levels =require('../Levels/levels.js');

// Import imgs
let comenzarImg=require('../../assets/img/Menu/Comenzar.png');
let configuracionImg=require('../../assets/img/Menu/Configuracion.png');
let prevImg=require('../../assets/img/Menu/Atras.png');

module.exports = class Menu{
    /*Params levels */     
     container = document.querySelectorAll('.container')[0];

    /*Levelsparams */
     levelSelected = 0;
     levelSelectedRightPosition= ((Levels.length * 800)-800)*-1;
     levels=Levels.length;
     levelsLeftLimit = Levels.length * 800;
    
    constructor(MainThis){
        this.MainThis=MainThis;     
    }
  
    //home page menu ,functions
    homeMenu={       
        delete:()=>{
            this.container.innerHTML='';
        },        
        create:()=>{
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
            buttonStart.style.background =`url(${comenzarImg})`;
            buttonConfig.style.background =`url(${configuracionImg})`;
            buttonStart.onclick=()=>{this.homeLevels.show()};
            buttonConfig.onclick=()=>{this.homeMenu.showConfig()};
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
            prevPage.style.background=`url(${prevImg})`;
            prevPage.onclick =()=>{this.homeMenu.show()};
            topBarLoadLevel.appendChild(prevPage);


            let levelsItems=document.createElement('div');
            let buttonPrev=document.createElement('button');
            let buttonNext=document.createElement('button');
            levelsItems.classList.add('levels-items');
            buttonPrev.classList.add('button-prev');
            buttonNext.classList.add('button-next');
            buttonPrev.onclick=()=>{this.homeLevels.selectPrevLevel();this.homeLevels.drawInfo()}
            buttonNext.onclick =()=>{this.homeLevels.selectNextLevel();this.homeLevels.drawInfo()}
            levelsBar.appendChild(levelsItems)
            levelsBar.appendChild(buttonPrev)
            levelsBar.appendChild(buttonNext)



            let buttonStartGame = document.createElement('button');
            buttonStartGame.classList.add('button-start');
            buttonStartGame.onclick=()=>{this.MainThis.initGame(this.levelSelected)}
            let TitleGame=document.createElement('p');
            TitleGame.innerText=Levels[this.levelSelected].nameLevel;
            TitleGame.classList.add('title-game');

            levelsInfo.appendChild(buttonStartGame);
            levelsInfo.appendChild(TitleGame)

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
            buttonClose.onclick=()=>{this.homeMenu.hideConfig()}
            modalConfig.appendChild(buttonClose);
            config.appendChild(blur);
            config.appendChild(modalConfig);


            /*Add in the dom */
            this.container.appendChild(MainMenu);
            this.container.appendChild(config)
            this.container.appendChild(loadLevelsMenu);
        },
        show:()=>{
            this.homeLevels.hide();
        
            let leftBar =document.querySelectorAll('.left-Bar')[0];
            let topBar =document.querySelectorAll('.top-Bar')[0];
            let bottomBar =document.querySelectorAll('.bottom-Bar')[0];
    
            leftBar.style.display='inline-flex';
            topBar.style.display='block';
            bottomBar.style.display='block';
    
            leftBar.style.animation='showleftBar 1s';
            topBar.style.animation='showtopBar 1s';
            bottomBar.style.animation='showbottomBar 1s';
        },
        hide:()=>{
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
        },

        // in home page , config modal
        showConfig:()=>{
            document.querySelectorAll('.config')[0].style.display='block';
            document.querySelectorAll('.modal-config')[0].style.animation ='showModal 0.5s';
        },
        hideConfig:()=>{
            let modal = document.querySelectorAll('.modal-config')[0];
            modal.style.animation ='hideModal 0.5s';        
            modal.addEventListener('animationend', (e) => {
                if(e.animationName == 'hideModal'){
                    document.querySelectorAll('.config')[0].style.display='none';
                    modal.style.animation ='showModal 0.5s';
                }                                
            })
        }
    }
    // home page levels ,functions
    homeLevels={
        show:()=>{
            this.homeMenu.hide();
            let loadLevelsMenu =document.querySelectorAll('.load-Levels-menu')[0];
            let topBar = document.querySelectorAll('.top-Bar-loadLevel')[0];   
            let levelsItems=document.querySelectorAll('.levels-items')[0];          
    
                // if not have items
            if(levelsItems.querySelectorAll('.items').length == 0){
                /*Create items levels */
                Levels.forEach((obj)=>{            
                    let item=document.createElement('img');
                    item.src= obj.imgPreview;            
                    item.classList.add('items');
                    item.innerText = obj.nameLevel;
                    levelsItems.appendChild(item);
                    /*Set position to level selected now */
                    levelsItems.style.right = this.levelSelectedRightPosition + "px";
                })
            }
    
            loadLevelsMenu.style.display="block"                
            topBar.style.display='block';
            topBar.style.animation="showloadLevels  1s";
            loadLevelsMenu.style.animation ="showloadLevels  1s";
        },

        hide:()=>{
            let loadLevelsMenu =document.querySelectorAll('.load-Levels-menu')[0];
            let topBar = document.querySelectorAll('.top-Bar-loadLevel')[0];                            
            topBar.style.animation='hideloadLevels 1s';
            loadLevelsMenu.style.animation ='hideloadLevels 1s';
            setTimeout(()=>{
                loadLevelsMenu.style.display='none';
                topBar.style.display ='none'
            },1000)
        },

        drawInfo:()=>{
            let InfoLevelContainer = document.querySelectorAll('.levels-info')[0];
            let button =InfoLevelContainer.querySelectorAll('.button-start')[0];
            let TitleGame=document.querySelectorAll('.title-game')[0];        
            button.onclick = ()=>{this.MainThis.initGame(this.levelSelected)}
            TitleGame.innerText=Levels[this.levelSelected].nameLevel;
        },
        
        selectPrevLevel:()=>{
            if((this.levelSelectedRightPosition * -1) != this.levelsLeftLimit - 800){            
                this.levelSelectedRightPosition -= 800;
                this.levelSelected -=1;
                let containerLevelItems=document.querySelectorAll('.levels-items')[0];
                containerLevelItems.style.right = this.levelSelectedRightPosition + "px";
            }
        },

        selectNextLevel:()=>{
            if(this.levelSelectedRightPosition != 0){     
                this.levelSelectedRightPosition += 800;        
                this.levelSelected+=1;
                let containerLevelItems=document.querySelectorAll('.levels-items')[0];       
                containerLevelItems.style.right = this.levelSelectedRightPosition + "px";            
            }
        }
    }

    // Game container primary ,user,blocks, insert here
    gameContainer={
        create:()=>{
            let gameContainer=document.createElement('div');
            gameContainer.classList.add('game-container');
            this.container.appendChild(gameContainer);
        },
        delete:()=>{
            this.container.removeChild(document.querySelectorAll('.game-container')[0]);
        }
    }    
    // in game , menu escape
    escapeMenu={
        create:()=>{
                    /*      Modal menu          */
            let config = document.createElement('div');
            config.classList.add('escape-menu');        
            let modalConfig = document.createElement('div');
            let buttonClose = document.createElement('button');      
            modalConfig.classList.add('modal-config');        
            buttonClose.classList.add('close')        
            buttonClose.onclick=()=>{this.MainThis.endGame()};
            modalConfig.appendChild(buttonClose);        
            config.appendChild(modalConfig);

            /*Add menu in the dom */
            this.container.appendChild(config)
        },
        delete:()=>{
            this.container.removeChild(
            document.querySelectorAll('.escape-menu')[0]);
        },
        show:()=>{
            document.querySelectorAll('.modal-config')[0].style.animation ='showModal 0.5s';
            document.querySelectorAll('.escape-menu')[0].style.display = 'block';
        },
        hide:()=>{
            document.querySelectorAll('.modal-config')[0].style.animation ='hideModal 0.5s';
            setTimeout(()=>{
                document.querySelectorAll('.escape-menu')[0].style.display = 'none';
            },500)
        }
    }




}