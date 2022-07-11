let Levels =require('../Levels/levels.js');
let Utils =require('../Utils/index.js')

// Import imgs
let comenzarImg=require('../../assets/img/Menu/Comenzar.png');
let configuracionImg=require('../../assets/img/Menu/Configuracion.png');


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
                let MainMenu =Utils.createElementDom({element:"div",className:"Main-menu"});
                // Create Left bar in menu
                let leftBar =Utils.createElementDom({element:"div",className:"left-Bar"})
                    // Buttons Left bar
                    let buttonStartStyle={background:`url(${comenzarImg})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}
                    let buttonStart =Utils.createElementDom({element:"button",className:"button-start selected",style:buttonStartStyle});
                    let buttonConfigStyle = {backgroundImage:`url(${configuracionImg})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}
                    let buttonConfig =Utils.createElementDom({element:"button",className:"button-config",style:buttonConfigStyle});
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
                let rightBar =Utils.createElementDom({element:"div",className:"right-Bar"});
                    // Buttons Right Bar
                    let bottomBar =Utils.createElementDom({element:"div",className:"bottom-Bar"});
                    rightBar.appendChild(bottomBar);


                // Add left bar and right bar to MainMenu
                MainMenu.appendChild(leftBar);
                MainMenu.appendChild(rightBar);

                return MainMenu
            },

            levelsMenu:()=>{
                // Create levels container
                let loadLevelsMenu =Utils.createElementDom({element:"div",className:"load-Levels-menu"});

                // create subsContainers
                let topBarLoadLevel =Utils.createElementDom({element:"div",className:"top-Bar-loadLevel"});
                let levelsBar =Utils.createElementDom({element:"div",className:"levels-bar"});
                let levelsInfo =Utils.createElementDom({element:"div",className:"levels-info"});


                    // create levels carrusel and buttons prev and next
                let levelsItems=Utils.createElementDom({element:"div",className:"levels-items"});
                let buttonPrev=Utils.createElementDom({element:"button",className:"button-prev"});
                let buttonNext=Utils.createElementDom({element:"button",className:"button-next"});

                buttonPrev.onclick=()=>{this.levelSection.selectPrevLevel();this.levelSection.drawInfo()}
                buttonNext.onclick =()=>{this.levelSection.selectNextLevel();this.levelSection.drawInfo()}
                levelsBar.appendChild(levelsItems)
                levelsBar.appendChild(buttonPrev)
                levelsBar.appendChild(buttonNext)


                    // create levels info section , button start game and info level
                let buttonStartGame =Utils.createElementDom({element:"button",className:"button-start"});
                buttonStartGame.onclick=()=>{this.MainThis.initGame(this.levelSelected)}

                let titleGame=Utils.createElementDom({element:"p",className:"title-game"});
                titleGame.innerText=Levels[this.levelSelected].nameLevel;

                levelsInfo.appendChild(buttonStartGame);
                levelsInfo.appendChild(titleGame)

                // add items to the container
                loadLevelsMenu.appendChild(topBarLoadLevel);
                loadLevelsMenu.appendChild(levelsBar);
                loadLevelsMenu.appendChild(levelsInfo);

                return loadLevelsMenu;
            },

            modalConfig:()=>{
                // Create modal config container
                let config = Utils.createElementDom({element:"div",className:"config"});

                    // Create Blur
                let blur = Utils.createElementDom({element:"div",className:"blur"});
                    // Create container solid in screen
                let modalConfig = Utils.createElementDom({element:"div",className:"modal-config"});

                    // Add text
                    let configTitle =Utils.createElementDom({element:"div",className:"title-config"});


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
                        let MasterScaleInfo=Utils.createElementDom({element:"p",id:"MasterScaleInfo"});
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
            let gameContainer=Utils.createElementDom({element:"div",className:"game-container"});
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
            let config =Utils.createElementDom({element:"div",className:"escape-menu"});
            let modalConfig = Utils.createElementDom({element:"div",className:"modal-config"});
            let buttonExit =Utils.createElementDom({element:"button",className:"exit selected"});
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
