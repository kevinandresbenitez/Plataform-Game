/*load first level*/
let main = new LevelLoader();
main.loadLevel(Level1);

/*Config default user */
let paramsUser={
    id:'user',
    width :60,
    height: 80, 
    direction:'right',
    jumpHeight:5,
    speedMoviment:40,        
    gravitySpeed:40
};

/*Initialize user*/
let user =new User(paramsUser);
user.create();
user.startMoviment();