Game Plataform developed by KAB XD

+ Use less
+ Use webpack
+ Use Babel
+ Use javascript-POO

--- Proyect commands ---
 + npm run build : create a build of the game in a folder called build at the root of the project
 + npm run serve : serves a compiled of the files in development mode by default in http://localhost:9000/
--- Proyect commands ---


---description of classes---

// main class
    from main class the others are instantiated , keyboard actions are associated with their methods ,
    has variables to move between the game menus 

// backgorund class
    can change background in game,can put black screen on the edges of the game

// block class
    the block classes are the elements that can be created to generate the game map, there are the solid blocks that are verified by the collision system (those with which the user could collide), and the image blocks (those that are not verified because in theory the user would never touch them eg: a part of a wall to which the user will never access).
    blocks at the beginning and end of the level, used to move to the next or previous level at a certain point.

// levelLoader class
    can generate the game levels through the canvas and can organize the solid blocks of the ones that don't

// menu class
    generates all the game menus, the animations they can do, the game containers and other important things XD

// movimentScreen class
    class to be able to move the camera, follow the user (it is connected)

// user class
    the main character of the game, has an interval for movement as well as gravity, in the interval every time he moves he checks the collision system to be able to move without crossing the blocks

---description of classes---



