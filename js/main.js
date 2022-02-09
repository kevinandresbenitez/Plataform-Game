/*load first level*/
let main = new LevelLoader();
main.LoadLevel(MapLevel1);

/*Config default user */
let paramsUser={
    id:'user',
    width :60,
    height: 80, 
    direction:'right',
    speedMoviment:50,    
    position:[120,0],    
    gravitySpeed:50
};

/*Initialize user*/
let user =new User(paramsUser);
user.create();
user.startMoviment();