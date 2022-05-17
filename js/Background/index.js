module.exports = class Background{

    static levelLimitBackground={
        create:()=>{
            // This backround is the black screen if the level < window screen , show limit level black
            let levelLimitBackground =document.createElement('div');
            levelLimitBackground.style.width='100vw';
            levelLimitBackground.style.height='100vh';
            levelLimitBackground.style.position='absolute';
            levelLimitBackground.id='levelLimitBackground';
            levelLimitBackground.style.top='0';
            levelLimitBackground.style.left='0';
            levelLimitBackground.style.background='#303843';
            levelLimitBackground.style.zIndex='1';
            document.querySelector('.container').appendChild(levelLimitBackground);
        },
        
        delete:()=>{
            document.querySelectorAll('.container')[0].removeChild(document.getElementById('levelLimitBackground'));
        }
    }

    static backgroundLevel={
        create:(background)=>{
            let backgroundLevel = document.createElement('div');
            backgroundLevel.classList.add('backgorund-level');
            backgroundLevel.style.background ='url('+ background +')';
            backgroundLevel.style.backgroundRepeat='no-repeat';
            backgroundLevel.style.backgroundSize='cover';
            backgroundLevel.style.position ='fixed';
            backgroundLevel.style.width ='100vw';
            backgroundLevel.style.height ='100vh';
            backgroundLevel.style.zIndex ='2';
            document.querySelector('.container').appendChild(backgroundLevel);
        },

        delete:()=>{
            let container =document.querySelector('.container');
            let backgroundLevel =container.querySelector('.backgorund-level');
            container.removeChild(backgroundLevel)
        },

        change:(background)=>{
            let container =document.querySelector('.container');
            container.querySelector('.backgorund-level').style.background ='url('+ background +')';
        }
    }

}