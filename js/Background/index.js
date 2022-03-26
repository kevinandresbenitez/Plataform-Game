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
            document.querySelectorAll('.container')[0].appendChild(levelLimitBackground);
        },
        
        delete:()=>{
            document.querySelectorAll('.container')[0].removeChild(document.getElementById('levelLimitBackground'));
        }
    }
}