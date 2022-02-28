// /*The screen what the user can see */
// class ScreenUser{    
//     /*Define container */
//     static container =document.querySelectorAll('.container')[0];
        
//     static xDirection=0;
//     static yDirection=0;

//     /*Window params */
//     static WindowHeight=window.innerHeight;
//     static WindowWidth=window.innerWidth;

//     /*Move interval params */
//     static moveRight;
//     static moveLeft;
//     static moveUp;
//     static moveDown;
    
//     static move={
//         Right:()=>{
//             this.xDirection -= 10;
//             this.drawMove();
//         },
    
//         Left:()=>{
//             this.xDirection += 10;
//             this.drawMove();
//         },
    
//         Up:()=>{
//             this.yDirection += 10;
//             this.drawMove();
//         },
    
//         Down:()=>{
//             this.yDirection -= 10;
//             this.drawMove();
//         }
//     }

//     static movimentClearInterval(){
//         /*Stop interval in move */
//         this.IntervalInitialized=false;
//     }

//     static startMoviment(){
//         /*Use one interval */
//         if(this.IntervalInitialized){
//             return false
//         }
//         this.IntervalInitialized=true;

//         let interval =setInterval(()=>{            
//             if(this.moveRight){
//                 this.move.Right();
//             }

//             if(this.moveLeft){
//                 this.move.Left();
//             }

//             if(this.moveUp){
//                 this.move.Up();
//             }

//             if(this.moveDown){
//                 this.move.Down();
//             }

//             if(!this.IntervalInitialized){
//                 clearInterval(interval);
//             }

//         },40)



//     }


//     static drawMove(){        
//         this.container.style.left =this.xDirection + 'px';
//         this.container.style.top =this.yDirection + 'px';
//     }

// }

// ScreenUser.startMoviment();
