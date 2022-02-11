function showLoaderLevel(){                
    /*Create div transition*/
    let img = document.getElementById('img-transition')                
    let frames=15;
    let imgFrame=0;

    return new Promise((resolve,reject)=>{W
        let interval=setInterval(()=>{
            img.src= "./assets/img/transitions/loadLevel/show/sprite_"+imgFrame+".png";                
            if(frames == imgFrame){
                clearInterval(interval);
                resolve(true);
            }
            imgFrame++
        },30)
    })    
    
}

function hideLoaderLevel(){
    let img = document.getElementById('img-transition')                
    let frames=15;
    let imgFrame=0;

    return new Promise((resolve,reject)=>{
        let interval=setInterval(()=>{
            img.src= "./assets/img/transitions/loadLevel/hide/sprite_"+imgFrame+".png";
            if(frames == imgFrame){
                img.src='';
                clearInterval(interval);
                resolve(true);
            }
            imgFrame++
        },30)
    })
}
