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
  
    
    //create homepage and levels sections 
    homepage={       
        create:{
            homeMenu:()=>{
                // Create Main menu container
                let MainMenu =document.createElement('div');
                MainMenu.classList.add('Main-menu');

                // Create Left bar in menu 
                let leftBar =document.createElement('div');
                leftBar.classList.add('left-Bar');
                    // Buttons Left bar
                    let buttonStart =document.createElement('button');
                    let buttonConfig =document.createElement('button');
                    buttonStart.classList.add('button-start');
                    buttonStart.classList.add('selected');
                    buttonConfig.classList.add('button-config');
                    buttonStart.style.background =`url(${comenzarImg})`;
                    buttonConfig.style.background =`url(${configuracionImg})`;
                    buttonStart.onclick=()=>{
                        this.levelSection.show();
                        this.MainThis.homeMenuSections.homeLevel =true;
                    };
                        buttonConfig.onclick=()=>{
                        this.homepage.show.modalConfig();
                        this.MainThis.homeMenuSections.homeConfig = true;
                    };

                    leftBar.appendChild(buttonStart);
                    leftBar.appendChild(buttonConfig);

                // Create Right bar in menu
                let rightBar =document.createElement('div');
                rightBar.classList.add('right-Bar');
                    // Buttons Right Bar
                    let bottomBar =document.createElement('div');
                    bottomBar.classList.add('bottom-Bar');
                    rightBar.appendChild(bottomBar);

                
                // Add left bar and right bar to MainMenu
                MainMenu.appendChild(leftBar);
                MainMenu.appendChild(rightBar);

                return MainMenu
            },

            levelsMenu:()=>{
                // Create levels container
                let loadLevelsMenu = document.createElement('div');
                loadLevelsMenu.classList.add('load-Levels-menu');

                // create subsContainers
                let topBarLoadLevel =document.createElement('div');
                let levelsBar = document.createElement('div');
                let levelsInfo =document.createElement('div');        
                topBarLoadLevel.classList.add('top-Bar-loadLevel');
                levelsBar.classList.add('levels-bar');
                levelsInfo.classList.add('levels-info');


                    // create levels carrusel and buttons prev and next
                let levelsItems=document.createElement('div');
                let buttonPrev=document.createElement('button');
                let buttonNext=document.createElement('button');
                levelsItems.classList.add('levels-items');
                buttonPrev.classList.add('button-prev');
                buttonNext.classList.add('button-next');
                buttonPrev.onclick=()=>{this.levelSection.selectPrevLevel();this.levelSection.drawInfo()}
                buttonNext.onclick =()=>{this.levelSection.selectNextLevel();this.levelSection.drawInfo()}
                levelsBar.appendChild(levelsItems)
                levelsBar.appendChild(buttonPrev)
                levelsBar.appendChild(buttonNext)


                    // create levels info section , button start game and info level
                let buttonStartGame = document.createElement('button');
                buttonStartGame.classList.add('button-start');
                buttonStartGame.onclick=()=>{this.MainThis.initGame(this.levelSelected)}
                let TitleGame=document.createElement('p');
                TitleGame.innerText=Levels[this.levelSelected].nameLevel;
                TitleGame.classList.add('title-game');
                levelsInfo.appendChild(buttonStartGame);
                levelsInfo.appendChild(TitleGame)

                // add items to the container
                loadLevelsMenu.appendChild(topBarLoadLevel);
                loadLevelsMenu.appendChild(levelsBar);
                loadLevelsMenu.appendChild(levelsInfo);

                return loadLevelsMenu;
            },

            modalConfig:()=>{
                // Create modal config container
                let config = document.createElement('div');
                config.classList.add('config');

                    // Create Blur
                let blur = document.createElement('div');
                blur.classList.add('blur');
                    // Create container solid in screen
                let modalConfig = document.createElement('div');
                modalConfig.classList.add('modal-config');
                    
                    // Add text
                    let configTitle =document.createElement('div');
                    configTitle.classList.add('title-config');



                    // Add Master Scale selector
                            //Create button increment MasterScale
                        let MasterScaleContainer=document.createElement('div');
                        let MasterScaleNext =document.createElement('button');
                        MasterScaleNext.innerText='Next'
                        MasterScaleNext.addEventListener('click',()=>{
                            let info =document.getElementById('MasterScaleInfo').innerText;
                            let newInfo = document.getElementById('MasterScaleInfo').innerText =parseInt(info) +10;
                            this.MainThis.gameConfigurations.MasterScale=parseInt(newInfo);
                        })
                            //Create button decrement MasterScale
                        let MasterScalePrev =document.createElement('button');
                        MasterScalePrev.innerText='prev'
                        MasterScalePrev.addEventListener('click',()=>{
                            let info =document.getElementById('MasterScaleInfo').innerText;
                            let newInfo =document.getElementById('MasterScaleInfo').innerText =parseInt(info) -10;
                            this.MainThis.gameConfigurations.MasterScale=parseInt(newInfo);
                        })
                            // create info masterscale
                        let MasterScaleInfo=document.createElement('p');
                        MasterScaleInfo.id='MasterScaleInfo';
                        MasterScaleInfo.innerText= this.MainThis.gameConfigurations.MasterScale
                        
                            // Add in masterscale container items
                        MasterScaleContainer.appendChild(MasterScalePrev)
                        MasterScaleContainer.appendChild(MasterScaleInfo)
                        MasterScaleContainer.appendChild(MasterScaleNext)
                    
                    // ADD items in container modal solid
                    modalConfig.appendChild(configTitle);
                    modalConfig.appendChild(MasterScaleContainer)
                // Add items in the container config
                config.appendChild(blur);
                config.appendChild(modalConfig);
                
                return config;
            },

            ALLMENU:()=>{
                /*Add in the dom */
                this.container.appendChild(this.homepage.create.homeMenu());
                this.container.appendChild(this.homepage.create.levelsMenu())
                this.container.appendChild(this.homepage.create.modalConfig());
            }
        },

        remove:{
            ALLMENU:()=>{
                this.container.innerHTML='';
            }
        },

        show:{
            homepage:()=>{
                this.levelSection.hide();
                let leftBar =document.querySelectorAll('.left-Bar')[0];
                let bottomBar =document.querySelectorAll('.bottom-Bar')[0];

                leftBar.style.display='inline-flex';
                bottomBar.style.display='block';

                leftBar.style.animation='showleftBar 1s';
                bottomBar.style.animation='showbottomBar 1s';
            },

            modalConfig:()=>{
                document.querySelectorAll('.config')[0].style.display='flex';
                document.querySelectorAll('.modal-config')[0].style.animation ='showModal 0.5s';
            }
        },

        hide:{
            homepage:()=>{
                let leftBar =document.querySelectorAll('.left-Bar')[0];
                let bottomBar =document.querySelectorAll('.bottom-Bar')[0];

                leftBar.style.animation='hideleftBar 1s';
                bottomBar.style.animation='hidebottomBar 1s';

                setTimeout(()=>{
                    leftBar.style.display='none';
                    bottomBar.style.display='none';
                },1000)
            },

            modalConfig:()=>{
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

    }
    // levels sections actions
    levelSection={
        show:()=>{
            this.homepage.hide.homepage();
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
        remove:()=>{
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
            let buttonExit = document.createElement('button');      
            modalConfig.classList.add('modal-config');
            buttonExit.classList.add('exit');
            buttonExit.classList.add('selected');
            buttonExit.onclick=()=>{
                this.MainThis.endGame();
            };
            modalConfig.appendChild(buttonExit);        
            config.appendChild(modalConfig);

            /*Add menu in the dom */
            this.container.appendChild(config)
        },
        remove:()=>{
            this.container.removeChild(
            document.querySelectorAll('.escape-menu')[0]);
        },
        show:()=>{
            document.querySelectorAll('.modal-config')[0].style.animation ='showModal 0.5s';
            document.querySelectorAll('.escape-menu')[0].style.display = 'flex';
        },
        hide:()=>{
            document.querySelectorAll('.modal-config')[0].style.animation ='hideModal 0.5s';
            setTimeout(()=>{
                document.querySelectorAll('.escape-menu')[0].style.display = 'none';
            },500)
        }
    }

}


